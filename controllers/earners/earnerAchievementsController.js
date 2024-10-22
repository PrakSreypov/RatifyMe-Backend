const EarnerAchievements = require("../../models/EarnerAchievements");
const Earners = require("../../models/Earners");
const Achievements = require("../../models/Achievements");
const Users = require("../../models/Users");
const AppError = require("../../utils/appError");
const BaseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

// const badgeClassControllers = new BaseControllers(EarnerAchievements, []);
const associated = [
    {
        model: Earners,
        // attributes: ["userId"],
        include: { model: Users },
    },
    {
        model: Achievements,
    },
];

class EarnerAchievementControllers extends BaseControllers {
    constructor() {
        super(EarnerAchievements, ["credId"], associated);
    }
    getOne = catchAsync(async (req, res, next) => {
        const { achievementId, earnerId } = req.params;
        const earnerAchieve = await EarnerAchievements.findOne({
            where: { achievementId, earnerId },
        });
        if (!earnerAchieve) {
            return next(new AppError("There is no earner achievement with these id", 404));
        }
        this.sendResponse(res, 200, earnerAchieve, "success");
    });

    getEarnerAchiveByUid = catchAsync(async (req, res, next) => {
        const { credId } = req.params;
        const earnerAchieve = await EarnerAchievements.findOne({
            where: { credId },
        });
        if (!earnerAchieve) {
            return next(new AppError("Credential ID is invalid", 404));
        }
        this.sendResponse(res, 200, earnerAchieve, "success");
    });
}

module.exports = new EarnerAchievementControllers();
