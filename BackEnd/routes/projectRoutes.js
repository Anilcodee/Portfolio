import express, { Router } from 'express'
import { addNewProject, deleteProject, getAllProjects, updateProject } from '../controllers/projectController.js'
import { checkAuth } from '../middlewares/checkAuth.js'
import { upload } from '../middlewares/multer.js'

const projectRouter = express(Router())

projectRouter.get('/admin/projects', checkAuth, getAllProjects)
projectRouter.get('/projects', getAllProjects)
projectRouter.post('/admin/projects', upload.single("imageUrl"), checkAuth, addNewProject)
projectRouter.delete('/admin/projects/:id', checkAuth, deleteProject)
projectRouter.put('/admin/project/:id', upload.single("imageUrl"), checkAuth, updateProject)

export default projectRouter



