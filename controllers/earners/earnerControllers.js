const Earners = require("../../models/Earners");
const Users = require("../../models/Users");
const Achievements = require("../../models/Achievements");
const AcademicBackgrounds = require("../../models/AcademicBackgrounds");

const BaseControllers = require("../../utils/baseControllers");

const catchAsync = require("../../utils/catchAsync");

class EarnerControllers extends BaseControllers {
    constructor() {
        super(Earners, [Users, Achievements, AcademicBackgrounds]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const earners = await Earners.findAll({
            include: [{ model: Users }, { model: Achievements }, { model: AcademicBackgrounds }],
        });

        res.status(200).json({
            status: "success",
            results: earners.length,
            data: earners,
        });
    });
}

module.exports = new EarnerControllers();
