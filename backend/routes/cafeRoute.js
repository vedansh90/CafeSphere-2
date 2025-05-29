import express from 'express'
import { bookCafe, getCafe, getCafeByCategory, getLocationCafes, searchCafe } from '../controllers/cafeContoller.js';
import authMiddleware from '../middleware/authMiddleware.js';
// import authMiddleware from '../middleware/authMiddleware.js';
const cafeRouter = express();

cafeRouter.get("/:id", getCafe)
cafeRouter.post("/:id/book", authMiddleware, bookCafe)
cafeRouter.get("/", searchCafe);
cafeRouter.get("/location/cafes", authMiddleware, getLocationCafes);
cafeRouter.get("/category/:category", getCafeByCategory);



export default cafeRouter;