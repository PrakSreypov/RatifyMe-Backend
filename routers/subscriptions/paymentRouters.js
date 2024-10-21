const express = require('express')
const router = express.Router()
const paymentControllers = require('../../controllers/subcriptions/paymentControllers')

router.route('/').get(paymentControllers.getAll)
router.route('/:id').get(paymentControllers.getOne)

module.exports = router