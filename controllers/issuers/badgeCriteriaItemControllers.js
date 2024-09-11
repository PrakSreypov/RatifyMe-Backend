const BadgeCriteriaItems = require("../../models/BadgeCriteriaItems");
const Achievements = require("../../models/Achievements");
const Criterias = require("../../models/Criterias");
const baseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

class BadgeCriteriaItemsControllers extends baseControllers {
    constructor() {
        super(BadgeCriteriaItems, [Achievements, Criterias]);
    }

    getAll = catchAsync(async (req, res, next) => {
        const badgeCriteriaItems = await BadgeCriteriaItems.findAll({
            include: [{ model: Achievements }, { model: Criterias }],
        });

        res.status(200).json({
            status: "success",
            result: badgeCriteriaItems.length,
            data: badgeCriteriaItems,
        });
    });
}

module.exports = new BadgeCriteriaItemsControllers();
