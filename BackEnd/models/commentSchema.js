import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    text: String

}, {timestamps: true});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;