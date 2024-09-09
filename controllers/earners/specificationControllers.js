
const Specifications = require("../../models/Specifications");
const FieldOfStudies = require("../../models/FieldOfStudies");

const BaseControllers = require("../../utils/baseControllers");

const catchAsync = require("../../utils/catchAsync");
class SpecificationControllers extends BaseControllers {
    constructor() {
        super(Specifications, [FieldOfStudies]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const specifications = await Specifications.findAll({
            include: [{ model: FieldOfStudies }],
        });

        res.status(200).json({
            status: "success",
            results: specifications.length,
            data: specifications,
        });
    });
}

module.exports = new SpecificationControllers();
