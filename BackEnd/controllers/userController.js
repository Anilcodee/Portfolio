import {OAuth2Client} from 'google-auth-library';
import User from '../models/userSchema.js';
import generateToken from '../config/token.js';

import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const {idToken} = req.body

        const ticket = await client.verifyIdToken({
            idToken,
            audience:process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()

        const {email, name, picture} = payload

        let user = await User.findOne({email})

        if(!user){
            user = await User.create({
                email,
                name,
                avatar: picture
            })
        }

        let jwtToken
        try {
            jwtToken = generateToken(user._id)
        } catch (error) {
            res.status(500).json({message: "Error generating token"})
        }

        res.cookie('user_token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        })

        res.status(200).json({user});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"});
}}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId
        if(!userId){
            return res.status(401).json({message: "Unauthorized"})
        }

        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        return res.status(200).json({user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}