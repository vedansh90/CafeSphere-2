import express from 'express'
import {addCafe, AddDrinks, AddItemToMenu, cafeIsOpenOrClose, cafeLogin, confirmbooking, deleleItemFromMenu, getCafes, getCafeStatus, getOneCafe, rejectbooking, verifyToken} from '../controllers/cafe-OwnerController.js'


const cafeownerRouter = express()

cafeownerRouter.get('/get-cafes', getCafes); 
cafeownerRouter.post("/login", cafeLogin);
cafeownerRouter.get("/owner-dashboard/:id", getOneCafe);
cafeownerRouter.post("/owner-dashboard/:id/menu", AddItemToMenu);
cafeownerRouter.delete("/owner-dashboard/:id/menu", deleleItemFromMenu);
cafeownerRouter.post("/owner-dashboard/:id/menu/drink", AddDrinks);
cafeownerRouter.post("/owner-dashboard/confirm-booking", confirmbooking);
cafeownerRouter.post("/owner-dashboard/reject-booking", rejectbooking);
cafeownerRouter.post("/owner-dashboard/verify-token", verifyToken);
cafeownerRouter.put("/owner-dashboard/status", cafeIsOpenOrClose);
cafeownerRouter.get("/owner-dashboard/status/:id", getCafeStatus)

// cafeownerRouter.post("/signup", cafeOwnerSignup)
// cafeownerRouter.get("/get-cafeowner/:id", getCafeOwner)
// cafeownerRouter.post("/login", cafeOwnerLogin)


export default cafeownerRouter;