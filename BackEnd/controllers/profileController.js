import uploadOnCloudinary from "../config/cloudinary.js"
import Profile from "../models/profileSchema.js"

export const profileImageChange = async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({message: "No image file provided"})
        }

        const profileImageUrl = await uploadOnCloudinary(req.file.path)

        if(!profileImageUrl){
            return res.status(500).json({message: "Image upload failed"})
        }

        const result = await Profile.deleteMany({})

        const updatedprofileImage = await Profile.create({
                profileImage: profileImageUrl
            })

        if(!updatedprofileImage){
            return res.status(404).json({message: "Admin not found"})
        }

        return res.status(200).json({
            message: "Profile image updated successfully",
            profile: updatedprofileImage
        })

    } catch (error) {
        console.error("Profile image update error: ", error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const getProfileImage = async (req, res) => {
    try {
        const profile = await Profile.find()
        res.status(200).json({Profile: profile})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}