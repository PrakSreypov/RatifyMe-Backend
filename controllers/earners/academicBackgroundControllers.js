const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
const Institutions = require("../../models/Institutions");
const FieldOfStudies = require("../../models/FieldOfStudies");
const AcademicLevels = require("../../models/AcademicLevels");
const Users = require("../../models/Users");

const BaseControllers = require("../../utils/baseControllers");

const catchAsync = require("../../utils/catchAsync");

class AcademicBackgroundsControllers extends BaseControllers {
    constructor() {
        super(AcademicBackgrounds, [Institutions, FieldOfStudies, AcademicLevels, Users]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const academicBackgrounds = await AcademicBackgrounds.findAll({
            include: [
                { model: Institutions },
                { model: FieldOfStudies },
                { model: AcademicLevels },
                { model: Users },
            ],
        });

        res.status(200).json({
            status: "success",
            results: academicBackgrounds.length,
            data: academicBackgrounds,
        });
    });
}

module.exports = new AcademicBackgroundsControllers();
