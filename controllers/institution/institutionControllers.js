const Institutions = require("../../models/Institutions");
const BaseControllers = require("../../utils/baseControllers");
const Users = require('../../models/Users')
const catchAsync = require("../../utils/catchAsync");

class InstitutionControllers extends BaseControllers {
    constructor() {
        // Pass Institution model and associations ()
        super(Institutions, [Users]);
    }

    // override the 'getAll'
    getAll = catchAsync(async (req, res, next) => {
        const institutions = await Institutions.findAll({
            include: [{ model: Users }],
        });

        res.status(200).json({
            status: "success",
            results: institutions.length,
            data: institutions,
        });
    });
}

module.exports = new InstitutionControllers();
