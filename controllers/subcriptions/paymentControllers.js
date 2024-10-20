const BaseControllers = require('../../utils/baseControllers')
const Payments = require('../../models/Payments')

const paymentControllers = new BaseControllers(Payments, ['subscriptionId'])

module.exports = paymentControllers