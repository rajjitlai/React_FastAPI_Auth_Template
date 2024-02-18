import express from "express"
import bcrypt from "bcrypt"

const router = express.Router()

import { User } from "../models/User.js";

router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const user = User.find({ email })
    if (user) {
        return res.json({ message: "User already existed" })
    }
})

export { router as UserRouter }