import express from "express"
import bcrypt from "bcrypt"

const router = express.Router()

import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

import nodemailer from "nodemailer"

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
    if (!validPassword) {
        return res.json({ message: "Incorrect Password" })
    }

    const token = jwt.sign({ username: user.username }, process.env.SECRET_JWT, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })

    return res.json({ status: true, message: "Login successfully" })
})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "User not registered" })
        }

        // mailer
        const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, { expiresIn: '5m' })

        var transponder = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "2.0lairaj@gmail.com", // change with other emails
                pass: "oblakpacvxhvhbcn"
            }
        })

        var mailerOptions = {
            from: '2.0lairaj@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/reset-your-password/${token}`
        }

        transponder.sendMail(mailerOptions, function (error, info) {
            if (error) {
                return res.json({ message: "Error sending email" })
            } else {
                return res.json({ message: "Email sent" })
            }
        })

    } catch (err) {
        console.log(err)
    }
})

router.post('/reset-password/:token', async (req, res) => {
    const token = req.params

    const { password } = req.body

    try {
        const decoded = await jwt.verify(token, process.env.SECRET_JWT)
        const id = decoded.id

        const hashpassword = bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({ _id: id }, { password: hashpassword })

        return res.json({ status: true, message: "password updated" })
    } catch (err) {
        return res.json("Invalid token")
    }
})

export { router as UserRouter }