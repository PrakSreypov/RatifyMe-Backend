const BaseControllers = require("../../utils/baseControllers");
const catchAsync = require("../../utils/catchAsync");

const Subscriptions = require("../../models/Subscriptions");
const Institutions = require("../../models/Institutions");
const ServicePlans = require("../../models/ServicePlans");

// const subscriptionControllers = new BaseControllers(Subscriptions, [], [Institutions, ServicePlans])
class SubscriptionControllers extends BaseControllers {
    constructor() {
        super(Subscriptions, [], [Institutions, ServicePlans]);
    }

    // Override the getAll method to filter by status
    getAll = catchAsync(async (req, res, next) => {
        // Fetch filtered records and total active records count
        const { records } = await this.getAllWithApiFeatures(req);

        // Count only records with status = true
        const totalActiveRecords = await Subscriptions.count({
            where: { status: true },
        });

        res.status(200).json({
            status: "success",
            total: totalActiveRecords,
            results: records.length,
            data: records,
        });
    });
}

const subscriptionControllers = new SubscriptionControllers();

module.exports = subscriptionControllers;