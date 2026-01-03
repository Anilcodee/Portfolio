import Admin from "../models/adminSchema.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";
import dotenv from "dotenv"
dotenv.config()

export const createAdmin = async (req, res) => {
    try {
        const {email, password, adminKey} = req.body;
        if (adminKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: "Unauthorized admin access" });
        }
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }
        const existingAdmin = await Admin.findOne({email})

        if(existingAdmin){
            return res.status(409).send("Admin already exists");
        }

        const hashed_password = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            email,
            password: hashed_password
        })

        let token;
        try {
            token = generateToken(newAdmin._id);
        } catch (error) {
            console.error("Token generation failed: ", error);
            return res.status(500).send("Internal Server Error");
        }

        res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(201).json({admin: {
            email: newAdmin.email
        }});
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }

        const existingAdmin = await Admin.findOne({email});

        if(!existingAdmin){
            return res.status(404).send("Admin not found");
        }
        let match = await bcrypt.compare(password, existingAdmin.password)
        if(!match){
            return res.status(401).send("Invalid Password");
        }

        let token;

        try {
            token = generateToken(existingAdmin._id);
        } catch (error) {
            console.error("Token generation failed: ", error);
            return res.status(500).send("Internal Server Error");
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        return res.status(200).json({admin:{
            email: existingAdmin.email
        }});
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

export const logoutAdmin = async (req, res) => {
    try {
        res.status(200).json({message:"Admin logged out successfully"});
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

export const getAdminProfile = async (req, res) => {
    try {
        const userId = req.userId;
        if(!userId){
            return res.status(401).send("Unauthorized");
        }
        const admin = await Admin.findById(userId).select('-password');
        if(!admin){
            return res.status(404).send("Admin not found");
        }
        return res.status(200).json({admin});
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

