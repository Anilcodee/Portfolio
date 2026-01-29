import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        unique: true,
        index: true
    },
    content:{
        type: String,
        required: true
    },
    coverImage:{
        type: String,
        required: false
    },
    author:{
        type: String,
        default: "Anil"
    },
    tags: [String],
    isPublished: {
        type: Boolean, 
        default: false
    },
    views:{
        type: Number,
        default: 0
    }

},{timestamps: true})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog

