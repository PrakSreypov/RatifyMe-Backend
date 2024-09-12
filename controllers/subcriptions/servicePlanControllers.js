const BaseControllers = require("../../utils/baseControllers");
const ServicePlans = require('../../models/ServicePlans')

class ServicePlanControllers extends BaseControllers {
    constructor() {
        super(ServicePlans, ["name", "stripeProductId"])
    }
}

module.exports = new ServicePlanControllers