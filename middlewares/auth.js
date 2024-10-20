const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {
    Users,
    Roles,
    Genders,
    Addresses,
    Institutions,
    Issuers,
    Earners,
    AcademicBackgrounds,
    Achievements,
} = require("../models");

const parseJwtExpiresIn = (expiresIn) => {
    return expiresIn.replace("day", "d");
};

// Sign Token
const signToken = (id) => {
    const jwtExpiresIn = parseJwtExpiresIn(process.env.JWT_EXPIRES_IN);
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: jwtExpiresIn,
    });
};

// ============ Start Send Token ============
exports.createSendToken = (user, statusCode, res, isSignup = false, additionalInfo = {}) => {
    const token = signToken(isSignup ? user.newUser.id : user.id);

    // Helper function to extract numeric
    const parseJwtCookiesExpiresInDays = (expiresIn) => {
        const days = parseInt(expiresIn, 10);
        return days;
    };

    const cookieOptions = {
        expires: new Date(
            Date.now() +
                parseJwtCookiesExpiresInDays(process.env.JWT_COOKIE_EXPIRES_IN) *
                    24 *
                    60 *
                    60 *
                    1000,
        ),
        httpOnly: true,
        sameSite: "Strict",
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
        status: "success",
        token,
        user,
        ...additionalInfo,
    });
};
// ============ End Send Token ============

// ============ Start Middleware for Authorization ============
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    // Check for token in Authorization header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError("You are not signed in!. Please sign in to get access.", 401));
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await Users.findByPk(decoded.id);
    if (!currentUser) {
        return next(new AppError("The user belonging to this token does no longer exist.", 401));
    }

    // check if Users changed password after the token was issued
    if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError("User recently changed password! Please log in again.", 401));
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
});

// ============ End Middleware for Authorization ============

// ============ Start role-based access control Middleware ============
exports.authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.roleId)) {
            return next(new AppError("You do not have permission to perform this action.", 403));
        }

        next();
    };
};
// ============ End role-based access control Middleware   ============

// ============ Start Check Authenticate Middleware ============
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            const currentUser = await Users.findByPk(decoded.id, {
                include: [{ model: Roles }, { model: Genders }],
            });

            if (!currentUser) {
                return next();
            }

            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            // Load address data
            const addressData = await Addresses.findOne({
                where: { userId: currentUser.id },
                include: [{ model: Users }, { model: Institutions }],
            });

            // Load additional data based on user role
            let additionalData = {};

            if (currentUser.roleId === 2) {
                const institutionData = await Institutions.findOne({
                    where: { userId: currentUser.id },
                    include: [{ model: Users }],
                });

                additionalData = { institutionData };
            } else if (currentUser.roleId === 3) {
                const issuerData = await Issuers.findOne({
                    where: { userId: currentUser.id },
                    include: [{ model: Users }, { model: Institutions }],
                });
                additionalData = { issuerData };
            } else if (currentUser.roleId === 4) {
                const earnerData = await Earners.findOne({
                    where: { userId: currentUser.id },
                    include: [
                        { model: Users },
                        { model: AcademicBackgrounds },
                        { model: Achievements },
                        {
                            model: Issuers,
                            include: [{ model: Users }, { model: Institutions }],
                        },
                    ],
                });
                additionalData = { earnerData };
            }

            // Attach the current user and additional data to res.locals
            res.locals.user = {
                currentUser,
                addressData,
                ...additionalData,
            };

            return next();
        } catch (error) {
            console.error("JWT verification failed:", error);
            res.clearCookie("jwt");
            return next();
        }
    }
    next();
};

// ============ End Check Authenticate Middleware   ============
