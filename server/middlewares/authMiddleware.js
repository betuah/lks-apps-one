const jwt           = require('jsonwebtoken')
const env           = require('../env')
const bcrypt        = require('bcryptjs')
const hash          = require('../config/hash_config')
const secret        = env.token_secret

const authMiddleware = async (req, res, next) => {
    try {
        const token          = req.cookies['sthingToken']
        const decryptedToken = hash.decrypt(token)
        const decoded        = jwt.verify(decryptedToken, secret)

        const userRoles = await bcrypt.compare('1', decoded.roles)

        req.token   = token
        req.id_user = decoded.uid
        req.role    = userRoles ? 1 : false
        req.uid     = decoded.uid

        next()
    } catch (error) {
        console.log(new Error(error))
        res.status(406).json({ status: 'Not Acceptable', code: 406, msg: "Invalid Token request."})
    }
}

module.exports = authMiddleware;