import express, { Router } from "express"

import {getUserProfile, googleLogin} from '../controllers/userController.js'
import { checkUser } from "../middlewares/checkUser.js"

const userAuthRouter = express(Router())

userAuthRouter.post('/auth/google', googleLogin)
userAuthRouter.get('/auth/me', checkUser, getUserProfile)


export default userAuthRouter