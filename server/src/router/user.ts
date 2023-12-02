//@ts-nocheck
import express from 'express'
// const multer = require('multer')
// const sharp = require('sharp')
import User from '../models/user'
import auth from '../middlewares/auth'
const router = express.Router()

router.post('/', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send({ errors: 'Account creation failed' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send({ errors: "Unable to login, please retry" });
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token )
        
        await req.user.save();

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// router.post('/passwordReset', async (req, res) => {
//     try {
//         const user = await User.findOne({email: req.body.email})
//         const token = await user.generateAuthToken()
//         res.status(201).send({user})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })


export default router