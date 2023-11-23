const router = require('express').Router()
const { Register, Login} = require('../../controllers/auth/auth.controller')
const { CheckUser } =require('../../middleware/middleware')

router.post('/register', CheckUser, Register)
router.post('/login', Login)



module.exports = router