const BaseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

const Subscriptions = require("../../models/Subscriptions");
const Institutions = require("../../models/Institutions");
const ServicePlans = require("../../models/ServicePlans");

class SubscriptionControllers extends BaseControllers {
    constructor() {
        super(Subscriptions, [Institutions, ServicePlans]);
    }
    getAll = catchAsync(async (req, res, next) => {
        const subscriptions = await Subscriptions.findAll({
            include: [{ model: Institutions }, { model: ServicePlans }],
        });
        res.status(200).json({
            status : "success",
            data : subscriptions
        })
    });
}

module.exports = new SubscriptionControllers()
