const Issuers = require("../../models/Issuers");
const Users = require("../../models/Users");
const Institutions = require("../../models/Institutions");
const baseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

class IssuerControllers extends baseControllers {
    constructor() {
        super(Issuers, [Users, Institutions]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const issuers = await Issuers.findAll({
            include: [{ model: Users }, { model: Institutions }],
        });
        res.status(200).json({
            status: "success",
            results: issuers.length,
            data: issuers,
        });
    });
}

module.exports = new IssuerControllers();
