import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({
    profileImage:{
        type: String,
        required: false
    }
},{timestamps:true})

const Profile = mongoose.model("Profile", profileSchema)

export default Profile