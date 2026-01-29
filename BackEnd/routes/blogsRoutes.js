import express, { Router } from 'express'
import { addNewBlog, deleteBlog, getAllBlogs, getBlogBySlug, getBlogs, updateBlog } from '../controllers/blogController.js'
import { checkAuth } from '../middlewares/checkAuth.js'
import { upload } from '../middlewares/multer.js'
const BlogRouter = express(Router())

BlogRouter.get("/blogs", getBlogs)
BlogRouter.get("/admin/blogs", checkAuth, getAllBlogs)
BlogRouter.get("/blogs/:slug", getBlogBySlug)
BlogRouter.post("/admin/blog", upload.single("coverImage"), checkAuth, addNewBlog)
BlogRouter.delete("/admin/blog/:id", checkAuth, deleteBlog)
BlogRouter.put("/admin/blog/:id", upload.single("coverImage"), checkAuth, updateBlog)

export default BlogRouter