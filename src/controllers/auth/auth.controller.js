const { ComparePassword, HashPassword } = require('../../helpers/pass.helper')
const { ResponseTemplate } = require('../../helpers/resp.helper')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const jwt = require('jsonwebtoken')

async function Register(req, res, next) {

    const { name, email, password, phone_number, role } = req.body

    const hashPass = await HashPassword(password)

    const payload = {
        name,
        email,
        password: hashPass,
        phone_number,
        role
    }

    try {

        const checkUser = await prisma.users.findUnique({
            where: {
                email
            }
        })

        if (checkUser) {
            return res.status(400).json({
                message:'email already used',
                status:'400'
            })

        }

        await prisma.users.create({
            data: {
                name:payload.name,
                email:payload.email,
                password:payload.password,
                phone_number:payload.phone_number,
            },
        })

        return res.status(200).json({
            message:'success',
            status:200
        })

    } catch (error) {
        next(error)
    }
}

async function Login(req, res, next) {
    const { email, password } = req.body

    try {

        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            let response = ResponseTemplate(null, 'bad request', 'invalid email or password', 400)
            res.status(400).json(response)
            return
        }

        let checkPassword = await ComparePassword(password, user.password)

        if (!checkPassword) {
            let response = ResponseTemplate(null, 'bad request', 'invalid email or password', 400)
            res.status(400).json(response)
            return
        }

        let token = jwt.sign(user, process.env.JWT_SECRET_KEY)

        let response = ResponseTemplate(token, 'success', null, 200)
        res.status(200).json(response)
        return

    } catch (error) {
        next(error)
    }
}



module.exports = {
    Register,
    Login,
}