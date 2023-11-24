const { ResponseTemplate } = require('../helpers/resp.helper')
const Joi = require('joi')

function CheckUser(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().max(150).email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$')).required(),
        phone_number: Joi.string().max(15).pattern(new RegExp('[0-9]+')).required(),
    })  

    const { error } = schema.validate(req.body)
    if (error) {
        let response = ResponseTemplate(null, 'invalid request', error.details[0].message, 400)
        return res.status(400).json(response)
    }
    next()
}


module.exports = {
    CheckUser,
}