const BaseControllers = require("../../utils/baseControllers");
const ServicePlans = require("../../models/ServicePlans");

class ServicePlanControllers extends BaseControllers {
    constructor(model, attributes) {
        super(model, attributes);
    }

    // Define the simple getAll method
    async getAllServices(req, res, next) {
        try {
            // Fetch all service plans from the database
            const records = await ServicePlans.findAll();

            // Send response
            res.status(200).json({
                status: "success",
                results: records.length,
                data: records,
            });
        } catch (error) {
            next(error);
        }
    }
}

// Instantiate the servicePlanControllers with ServicePlans model and attributes
const servicePlanControllers = new ServicePlanControllers(ServicePlans, ["stripeProductId"]);

module.exports = servicePlanControllers;
