import express from 'express'
import { addReview, allReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const reviewRouter = express();

reviewRouter.get("/:id", allReview);
reviewRouter.post("/add-review", authMiddleware, addReview);

export default reviewRouter;