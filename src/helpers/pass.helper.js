const bcrypt = require('bcrypt')
require('dotenv').config()

function HashPassword(password){

    // const saltParse = parseInt(process.env.SALT_ROUNDS)
    const saltRounds = 2
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function HashToken(token){

    // const saltParse = parseInt(process.env.SALT_ROUNDS)
    const saltRounds = 2
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(token, salt)
    return hash
}

function ComparePassword(password, HashPassword){
    const compare = bcrypt.compareSync(password, HashPassword)
    return compare
}


module.exports ={
    HashPassword,
    ComparePassword,
    HashToken
}