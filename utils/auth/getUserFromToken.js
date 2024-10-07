const Users = require("../../models/Users");
const crypto = require("crypto");
const { Op } = require("sequelize");

exports.getUserFromToken = async (token) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the user associated with the hashed token
    const user = await Users.findOne({
        where: {
            passwordResetToken: hashedToken,
            passwordResetExpires: { [Op.gt]: Date.now() },
        },
    });

    return user;
};
