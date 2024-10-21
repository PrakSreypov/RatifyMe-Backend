const BaseControllers = require("../../utils/baseControllers");
const Payments = require("../../models/Payments");
const Subscriptions = require("../../models/Subscriptions");
const ServicePlans = require("../../models/ServicePlans");

const paymentControllers = new BaseControllers(
    Payments,
    ["subscriptionId"],
    [{ model: Subscriptions, include: [{ model: ServicePlans, attributes: ["name"] }] }],
);

module.exports = paymentControllers;
