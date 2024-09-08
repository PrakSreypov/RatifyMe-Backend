const express = require('express')

const roleRouters = require('./roleRouters')

const router = express.Router();

router.use('/roles', roleRouters);

module.exports = router