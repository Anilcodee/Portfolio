import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import projectRouter from './routes/projectRoutes.js';
import {trackVisit} from './middlewares/trackVisit.js';
import analyticsRouter from './routes/analyticsRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import BlogRouter from './routes/blogsRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import userAuthRouter from './routes/userAuthRoutes.js';
dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: process.env.FRONTEND_LINK,
        credentials: true,
    }
))

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', contactRouter);
app.use('/api', projectRouter);
app.use('/api', analyticsRouter);
app.use('/api', profileRouter);
app.use('/api', BlogRouter);
app.use('/api', commentRouter);
app.use('/api', userAuthRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})