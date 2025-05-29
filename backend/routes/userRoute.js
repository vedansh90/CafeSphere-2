import express from 'express'
// import userModel from '../models/userModel'
import { bookedCafes, deleteUserAccount, forgotPassword, makeNewPasswordFromForgot, oneBookingOfUser, ProfileChangePassword, removeCafeFromWishlist, resetPassword, saveCafeToUser, savedCafes, updateUserDetails, userLogin, userProfile, userSignup } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const userRouter = express()

userRouter.post("/save-cafe", authMiddleware, saveCafeToUser);
userRouter.delete("/profile/save-cafe", authMiddleware, removeCafeFromWishlist);
userRouter.get("/saved-cafes", authMiddleware, savedCafes);
userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignup);
userRouter.post("/login/forgot-password", forgotPassword);
userRouter.post("/login/reset-password", resetPassword);
userRouter.post("/login/make-new-password", authMiddleware, makeNewPasswordFromForgot);
userRouter.get("/profile/:id", userProfile);   
userRouter.get("/booked-cafes/:id", authMiddleware, bookedCafes);
userRouter.get("/booking/:id", oneBookingOfUser); //
userRouter.put("/profile/change-password", authMiddleware, ProfileChangePassword);
userRouter.delete("/profile/delete-account", authMiddleware, deleteUserAccount);
userRouter.put("/profile/update-details", authMiddleware, updateUserDetails);

export default userRouter