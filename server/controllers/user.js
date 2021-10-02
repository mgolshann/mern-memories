import mongoose from 'mongoose'
import UserModel from '../models/user.js'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

//***************** */ Sign in Function
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) res.status(404).send({ message: "user or password is invalid" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) res.status(400).send({ message: "Invalid credentials" })

        const token = jwt.sign({ name: user.name, email: user.email, id: user._id }, "test", { expiresIn: "1h" })
        res.status(200).send({ result: user, token })

    } catch (error) {
        res.status(500).send({ message: "Something went wrong !!" })
    }
}


//***************** */ Sign up Function
export const signup = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    console.log("okkkkkkkk")
    try {
        const user = await UserModel.findOne({ email })
        if (user) req.status(400).send({ message: "user already exists" })
        console.log(email)

        if (password !== confirmPassword) req.status(400).send({ message: "Passwords don't match" })
        const hashPassword = await bcrypt.hash(password, 12)

        const result = await UserModel.create({
            email,
            password: hashPassword,
            name: `${firstname} ${lastname}`
        })

        const token = jwt.sign({ name: result.name, email: result.email, id: result._id }, "test", { expiresIn: "1h" })
        res.status(200).send({ result, token })

    } catch (error) {
        res.status(500).send({ message: 'Something went wrong !!' })
    }
}