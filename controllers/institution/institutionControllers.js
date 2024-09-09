const Institutions = require("../../models/Institution");
const BaseController = require("../../utils/baseControllers");
const Users = require('../../models/Users')
const catchAsync = require("../../utils/catchAsync");

class InstitutionController extends BaseController {
    constructor() {
        // Pass Institution model and associations ()
        super(Institutions, [Users]);
    }

    // override the 'getAll'
    getAll = catchAsync(async (req, res, next) => {
        const institution = await Institution.findAll({
            include: [{ model: Users }],
        });

        res.status(200).json({
            status: "success",
            results: institution.length,
            data: institution,
        });
    });
}

module.exports = new InstitutionController();
