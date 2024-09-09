const BadgeClasses = require("../../models/BadgeClasses");
const Achievements = require("../../models/Achievements");
const AchievementTypes = require("../../models/AchievementTypes");
const BaseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

class AchievementControllers extends BaseControllers {
    constructor() {
        super(Achievements, [BadgeClasses, AchievementTypes]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const achievements = await Achievements.findAll({
            include: [{ model: BadgeClasses }, { model: AchievementTypes }],
        });

        res.status(200).json({
            status: "success",
            result: achievements.length,
            data: achievements,
        });
    });
}

module.exports = new AchievementControllers();
