import Comment from '../models/commentSchema.js';
export const addComment = async (req, res) => {
    try {
        const {text, rating} = req.body
        if(!text || rating == null){
            return res.status(400).json({message: "Text and rating are required"})
        }
        const comment = await Comment.create({
            blog: req.params.blogId,
            user: req.userId,
            text,
            rating
        })
        res.status(201).json({comment})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteComment = async (req, res) => {
    try {
        const {id} = req.params
        const comment = await Comment.findByIdAndDelete(id)
        if(!comment){
            return res.status(404).json({message: "Comment not found"})
        }
        res.status(200).json({message: "Comment deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateComment = async (req, res) => {
    try {
        const {id} = req.params
        const {text, rating} = req.body
        const updatedFields = {}
        if(text){
            updatedFields.text = text
        } 
        if(rating != null){
            updatedFields.rating = rating
        }

        const comment = await Comment.findByIdAndUpdate(id, {$set: updatedFields}, {new: true})
        if(!comment){
            return res.status(404).json({message: "Comment not found"})
        }
        res.status(200).json({comment})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getCommentsByBlog = async (req, res) => {
    try {
        const comments = await Comment.find({blog: req.params.blogId}).populate('user', 'name avatar').sort({createdAt: -1})
        if(!comments){
            return res.status(404).json({message: "No comments found for this blog"})
        }
        res.status(200).json({comments})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const  getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate("user", "name avatar").populate("blog", "title slug").sort({createdAt: -1})
        res.status(200).json({comments})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}