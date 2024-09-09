const Courses = require("../../models/Courses");
const Specializations = require("../../models/Specializations");
const FieldOfStudies = require("../../models/FieldOfStudies");

const BaseControllers = require("../../utils/baseControllers");

const catchAsync = require("../../utils/catchAsync");

class CourseControllers extends BaseControllers {
    constructor() {
        super(Courses, [Specializations, FieldOfStudies]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const courses = await Courses.findAll({
            include: [{ model: Specializations }, { model: FieldOfStudies }],
        });

        res.status(200).json({
            status: "success",
            results: courses.length,
            data: courses,
        });
    });
}

module.exports = new CourseControllers();
