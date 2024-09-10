const BadgeClasses = require("../../models/BadgeClasses");
const Issuers = require("../../models/Issuers");
const BaseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

class BadgeClassesControllers extends BaseControllers {
    constructor() {
        super(BadgeClasses, [Issuers]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const badgeClasses = await BadgeClasses.findAll({
            include: [{ model: Issuers }],
        });
        res.status(200).json({
            status: "success",
            results: badgeClasses.length,
            data: badgeClasses,
        });
    });
}

module.exports = new BadgeClassesControllers();
