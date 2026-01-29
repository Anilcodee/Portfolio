import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: String,
    avatar: String
}, {timestamps: true});

const User = mongoose.model("User",userSchema);

export default User;