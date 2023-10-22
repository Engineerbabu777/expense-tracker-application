
import express from 'express';
import { addNewCategory } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();


// ALL ROUTES!
// GET ROUTES!

// POST ROUTES!
categoryRoutes.post('/add', addNewCategory) // /add will be handled here!

// PUT ROUTES!


// DELETE ROUTES!






export default categoryRoutes;

