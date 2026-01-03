import express, { Router } from 'express';
import { getAllContacts, submitContactForm } from '../controllers/contactController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const contactRouter = express(Router());

contactRouter.post('/contact', submitContactForm);
contactRouter.get('/admin/getcontacts', checkAuth, getAllContacts)

export default contactRouter;
