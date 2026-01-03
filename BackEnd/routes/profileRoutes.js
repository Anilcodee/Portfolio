import express, { Router } from "express"
import { upload } from "../middlewares/multer.js"
import { getProfileImage, profileImageChange } from "../controllers/profileController.js"
import { checkAuth } from "../middlewares/checkAuth.js"
import { trackVisit } from "../middlewares/trackVisit.js"

const profileRouter = express(Router())

profileRouter.post('/admin/profileimagechange', upload.single("imageUrl"), checkAuth, profileImageChange)
profileRouter.get('/getprofileimage', trackVisit, getProfileImage)

export default profileRouter