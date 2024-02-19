import express from "express"
import bcrypt from "bcrypt"

const router = express.Router()

import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email })
    if (user) {
        return res.json({ message: "User already existed" })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashpassword,
    })

    await newUser.save()
    return res.json({ status: true, message: "record registered" })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ message: "User is not registered" })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.json({message: "Incorrect Password"})
    }

    const token = jwt.sign({username: user.username}, )
})

export { router as UserRouter }