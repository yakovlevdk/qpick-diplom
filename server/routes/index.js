const express = require('express')

const router = express.Router({mergeParams: true})

router.use('/baskets', require('./baskets'))
router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/reviews', require('./reviews'))
router.use('/types', require('./types'))
module.exports = router