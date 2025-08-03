import express from "express";
import moviesController from '../controllers/moviesController.js';

const movieRouter = express.Router();

movieRouter.get('/', moviesController.index);
movieRouter.get('/:id', moviesController.show);

export default movieRouter;