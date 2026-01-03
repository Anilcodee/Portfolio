import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (filePath) => {
    try {
        if(!filePath){
            return null;
        }
        let result = await cloudinary.uploader.upload(filePath);
        console.log("Cloudinary upload result:", result);
        fs.unlinkSync(filePath);
        return result.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.error("Error uploading to Cloudinary:", error);
    }
}

export default uploadOnCloudinary;
