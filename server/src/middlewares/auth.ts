//@ts-nocheck
import jwt from 'jsonwebtoken'
import User from '../models/user'
import config from '../config/config'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.jwt.secret)
        const user = await User.findOne({ _id: decoded._id })
        
        if(!user) {
            throw new Error()
        }

        req.token = token
        req.user = user                                               //attaching property to req.
        
        next()   
    } catch (e) {
        res.status(401).send({error : 'Please authenticate.'})
    }
}

export default auth