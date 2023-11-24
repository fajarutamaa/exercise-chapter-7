const router = require('express').Router()
const authRoute = require('./auth/auth.route')
const morgan = require('morgan')

router.use(morgan('dev'))

router.use('/auth', authRoute)

module.exports = router
