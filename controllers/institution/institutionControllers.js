const Institution = require("../../models/Institution");
const BaseController = require("../../utils/baseControllers");
const Users = require('../../models/Users')
const catchAsync = require("../../utils/catchAsync");

class InstitutionController extends BaseController {
    constructor() {
        super(Institution);
    }

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
