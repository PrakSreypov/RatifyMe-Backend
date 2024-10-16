const EarnerAchievements = require("../../models/EarnerAchievements");
const AppError = require("../../utils/appError");
const BaseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

// const badgeClassControllers = new BaseControllers(EarnerAchievements, []);
class EarnerAchievementControllers extends BaseControllers{
    constructor(){
        super(EarnerAchievements, [])
    }
    getOne = catchAsync(async(req, res, next) => {
        const {achievementId, earnerId} = req.params
        const earnerAchieve = await EarnerAchievements.findOne({
            where : {achievementId, earnerId}
        })
        if(!earnerAchieve) {
            return next(new AppError("There is no earner achievement with these id", 404))
        }
        this.sendResponse(res, 200, earnerAchieve, "success")
    })
}

module.exports = new EarnerAchievementControllers();
