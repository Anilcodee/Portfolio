import uploadOnCloudinary from "../config/cloudinary.js";
import Blog from "../models/blogSchema.js"
import slugify from "../utils/slugify.js";


export const addNewBlog = async (req, res) => {
    try {
        const {title, content, author, isPublished} = req.body
        if(!title || !content){
            return res.status(400).json({message: "Title and Content are required"})
        }
        let slug = slugify(title)

        let exists = await Blog.findOne({slug})
        if(exists){
            slug = `${slug}-${Date.now()}`
        }
        let tags = []
        if(req.body.tags){
            tags = JSON.parse(req.body.tags)
        }

        let BlogImageUrl
        if(req.file){
            BlogImageUrl = await uploadOnCloudinary(req.file.path)
        }

        const blog = await Blog.create({
            title,
            slug,
            content,
            tags,
            author: author || undefined,
            isPublished: isPublished ?? undefined,
            coverImage: BlogImageUrl
        })
        res.status(201).json({blog})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        if(!blog){
            return res.status(404).json({message: "Blog not found"})
        }
        res.status(200).json({message: "Blog deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateBlog = async (req, res) => {
    try {
        const {id} = req.params
        const {title, content, author, isPublished} = req.body

        const updatedFields = {}
        let coverImageUrl
        if(req.file){
            coverImageUrl = await uploadOnCloudinary(req.file.path)
            updatedFields.coverImage = coverImageUrl
        }
        let tags = []
        if(req.body.tags){
            tags = JSON.parse(req.body.tags)
            updatedFields.tags = tags
        }

        if(title?.trim()){
            updatedFields.title = title
            let slug = slugify(title)
            let exists = await Blog.findOne({slug})
            if(exists){
                slug = `${slug}-${Date.now()}`
            }
            updatedFields.slug = slug
        }
        if(content?.trim()){
            updatedFields.content = content
        }
        if(author?.trim()){
            updatedFields.author = author
        }
        if(isPublished !== undefined){
            updatedFields.isPublished = isPublished
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id,
            {$set: updatedFields},
            {new: true}
        )
        if(!updatedBlog){
            return res.status(404).json({message: "Blog not found"})
        }
        res.status(200).json({blog: updatedBlog})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getBlogs = async (req, res) => {
    try {
        const {search, tag, sort} = req.query

        let query = {isPublished: true}
        if(search && search.trim()){
            query.$or = [
                {title: {$regex: search, $options: "i"}},
                {content: {$regex: search, $options: "i"}},
                {tags: {$regex: search, $options: "i"}}
            ]
        }
        if(tag && tag.trim()){
            query.tags = tag
        }
        let sortOption = {createdAt: -1} // default latest
        if(sort === "oldest"){
            sortOption = {createdAt: 1}
        }else if(sort === "views"){
            sortOption = {views: -1}
        }
        const blogs = await Blog.find(query).sort(sortOption)
        res.status(200).json({blogs})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json({blogs})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            {slug: req.params.slug, isPublished: true},
            {$inc: {views: 1}},
            {new: true}
        )
        if(!blog){
            return res.status(404).json({message: "Blog not found"})
        }
        res.status(200).json({blog})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}