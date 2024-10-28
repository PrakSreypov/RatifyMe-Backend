const AcademicBackgrounds = require("../../models/AcademicBackgrounds");
const Institutions = require("../../models/Institutions");
const FieldOfStudies = require("../../models/FieldOfStudies");
const AcademicLevels = require("../../models/AcademicLevels");
const Users = require("../../models/Users");
const Genders = require("../../models/Genders");
const Roles = require("../../models/Roles");
const BaseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");
const { Earners } = require("../../models");

class AcademicBackgroundsControllers extends BaseControllers {
    constructor() {
        super(
            AcademicBackgrounds,
            [],
            [
                {
                    model: Institutions,
                    include: [Users],
                },
                FieldOfStudies,
                AcademicLevels,
                {
                    model: Users,
                    include: [Genders, Roles],
                },
            ],
        );
    }

    // Custom method to get academic background by user ID
    getAcademicByUserId = catchAsync(async (req, res, next) => {
        const { userId } = req.params;

        const academicBg = await AcademicBackgrounds.findAll({
            where: { userId },
            include: [
                {
                    model: Institutions,
                    include: [Users],
                },
                FieldOfStudies,
                AcademicLevels,
                {
                    model: Users,
                    include: [Genders, Roles],
                },
            ],
        });

        if (!academicBg) {
            return res.status(404).json({
                status: "fail",
                message: "No academic background found for this user",
            });
        }

        res.status(200).json({
            status: "success",
            data: academicBg,
        });
    });
}

// Export the new controller class with custom method
module.exports = new AcademicBackgroundsControllers();
