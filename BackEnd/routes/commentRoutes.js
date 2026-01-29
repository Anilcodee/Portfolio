import express, { Router } from 'express';
import { checkUser } from '../middlewares/checkUser.js';
import { addComment, deleteComment, getAllComments, getCommentsByBlog, updateComment } from '../controllers/commentController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const commentRouter = express(Router());

commentRouter.post('/blogs/:blogId/comment', checkUser, addComment)
commentRouter.delete('/blogs/:blogId/comment/:id', checkUser, deleteComment)
commentRouter.put('/blogs/:blogId/comment/:id', checkUser, updateComment)
commentRouter.get('/blogs/:blogId/comments', getCommentsByBlog)
commentRouter.get('/admin/comments', checkAuth, getAllComments)
commentRouter.delete('/admin/comment/:id', checkAuth, deleteComment)

export default commentRouter;


