const Specializations = require("../../models/Specializations");
const FieldOfStudies = require("../../models/FieldOfStudies");

const BaseControllers = require("../../utils/baseControllers");

const catchAsync = require("../../utils/catchAsync");
class SpecializationsControllers extends BaseControllers {
    constructor() {
        super(Specializations, [FieldOfStudies]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const specializations = await Specializations.findAll({
            include: [{ model: FieldOfStudies }],
        });

        res.status(200).json({
            status: "success",
            results: specializations.length,
            data: specializations,
        });
    });
}

module.exports = new SpecializationsControllers();
