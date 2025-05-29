import bcrypt from "bcrypt"
import validator from 'validator'
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import sendWelcomeEmail from "../utils/welcomeEmail.js"
import { generateOTP, sendResetEmail } from "../utils/sendResetEmail.js"
import bookingModel from '../models/bookingModel.js';
import cafeModel from "../models/cafeModel.js"

const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if(user){
            // user found
            const isMatch = await bcrypt.compare(password, user.password)
        
            if(!isMatch){
                return res.json({success: false, message: "Incorrect password"})
            }
            const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "30d" });
            console.log("Signing Token With Secret:", process.env.JWT_SECRET);
            console.log(user);
             res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            userId: user._id,
            userName: user.name,
        });
        }
        else{
            // user not found
            return res.json({success: false, message:"Account not exist"});
        }
    }
    catch(err){
        console.log(err)
        res.json({success: false, message: err.message})
    }
}

const userSignup = async (req, res) => {

    try{
    
    const {name, email, password, location, contactNo} = req.body;
    console.log(req.body);
    
    if(!name || !email || !password || !location || !contactNo){
        return res.json({success: false, message: "Missing details"})
    }
    
    const isPresent = await userModel.findOne({email})
    if(isPresent){
        return res.json({success: false, message: "User already exists"})
    }

    if(!validator.isEmail(email)){
        return res.json({success: false, message: "Please Enter a valid email"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
        name, 
        email,
        password: hashedPassword,
        location, 
        contactNo,
    }

    const newUser = new userModel(userData)
    await newUser.save();

    sendWelcomeEmail(newUser.email, newUser.name);

    res.json({success: true, message: "User added successfully"})

    }
    catch(err){
        console.log(err)
        res.json({success: false, message: err.message})
    }

}

const forgotPassword = async (req, res) => {
   try{
    let {email} = req.body;

    if(!email){
        return res.json({success: false, message: "All feilds are required"});
    }

    const user = await userModel.findOne({email: email});
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    if(!user){
        return res.json({success: false, message: "User not found", code});
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.resetOTP = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendResetEmail(email, otp);

    res.json({success: true, message: "OTP Sent to your E-mail"});
   }
   catch(err){
    console.error("Forgot password error:", err);
    res.json({success: false, message: err.message})
   }
}

const resetPassword = async (req, res) => {
    try{
        let {otp} = req.body;

        if(!otp){
            return res.json({success: true, message: "Please enter the Code"});
        }

        const user = await userModel.findOne({resetOTP: otp});

        if(!user){
            return res.json({success: false, message: "Invalid code"});
        }

        if(Date.now() > user.otpExpiry) {
            return res.json({ success: false, message: "OTP expired, please request a new one" });
        }

         const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
            );

        res.json({success: true, message: "OTP Verified Successfully", resetToken});
    }catch(err){
        console.log("Reset password error");
        res.json({success: false, message: err.message});
    }
}

const userProfile = async (req, res) => {
    try{      

        let {id} = req.params;

        const user = await userModel.findById(id)
        .populate({
            path: "bookings",
            populate: {
                path: "cafe",
            }
        })
        .populate({
            path: "savedCafes",
        });
        console.log(user);
        console.log(req.userId);
        console.log("dndn")

        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        console.log(user);

        res.json({success: true, user});
    }catch(err){
        res.json({ message: err.message });
    }
}

const makeNewPasswordFromForgot = async (req, res) => {
    
    try{
        const user = await userModel.findById(req.user.id);

        if(!user){
            console.log("user not found")
            console.log(req.user.id);
            return res.json({success: false, message: "User not found"});
        }

        const {newPassword, confirmPassword} = req.body;

        if(!newPassword || !confirmPassword){
            return res.json({success: false, message: "All feilds are requires"})
        }

        if(newPassword != confirmPassword){
            console.log("password not match")
            return res.json({success: false, message: "Passwords do not match"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        console.log("Password Changed succesfully");
        res.json({success: true, message: "Password updated Successfully"});

    }
    catch(err){
        console.log("error")
        res.json({success: false, message: err.message});
    }
}

const saveCafeToUser = async (req, res) => {
    try {
        
        const user = await userModel.findById(req.user.id);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        const {cafeId} = req.body; 
        const cafe = await cafeModel.findById(cafeId);
        if(!cafe){
            return res.json({success: false, message: "Cafe not found"});
        }

        if (user.savedCafes.includes(cafeId)) {
            return res.status(400).json({ message: "Cafe already in wishlist" });
        }

        user.savedCafes.push(cafeId);
        await user.save();

        res.status(200).json({ message: "Cafe added to Saved cafe", savedCafes: user.savedCafes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

const removeCafeFromWishlist = async (req, res) => {
    try{
        
        const userId = req.user.id;
        const {cafeId} = req.body;

        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User Not found"});
        }

        console.log("Wishlist before:", user.savedCafes.map(id => id.toString()));
        console.log("Removing cafe ID:", cafeId);
    
        const updatedWishlist = user.savedCafes.filter(
          (cafe) => cafe.toString() !== cafeId
        );
    
        user.set("savedCafes", updatedWishlist);
    
        await user.save();

       res.json({success: true,  message: "Cafe removed from wishlist"})
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

const savedCafes = async (req, res) => {
    try{
        
        const user = await userModel.findById(req.user.id)
        .populate({
            path: "savedCafes",
        });
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        const savedCafe = user.savedCafes;

        res.json({success: true, savedCafes: savedCafe });
        
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

const bookedCafes = async (req, res) => {
    try{
        const user = await userModel.findById(req.user.id)
        .populate({
            path: "bookings",
            populate: {
                path: "cafe", 
            }
        });

        if(!user){
            return res.json({success: false, message: "Cafenot found"});
        }
        
        const bookedCafes = user.bookings;
        res.json({success: true, bookedCafes});
    }
    catch(err){
        return res.json({success: false, message: err.message});
    }
}

const ProfileChangePassword = async (req, res) => {
    try{
        let {oldPassword, newPassword, confirmPassword} = req.body;

        if(!oldPassword || !newPassword || !confirmPassword){
            return res.json({success: false, message: "All feilds are required"});
        }
        const user  = await userModel.findById(req.user.id);

        if(!user){
            console.log("User not found");
            return res.json({success: false, message: "User not found"});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            console.log("Incorrect old password");
            return res.json({success: false, message: "Incorrect old password" });
        }

        if(newPassword != confirmPassword){
            console.log("Passwords do not match");
            return res.json({success: false, message: "Passwords do not match"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({success: true, message: "Password updated Successfully"});
    }
    catch(err){
        return res.json({success: false, message: err.message});
    }
}

const deleteUserAccount = async (req, res) => {
    try{
        const user = await userModel.findByIdAndDelete(req.user.id);

        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        res.json({success: true, message: "Account deleted Successfully"});
    }
    catch(err){
        return res.json({success: false, message: err.message});
    }
}

const updateUserDetails = async (req, res) => {
    try{
        let {name, email, contactNo, location} = req.body;

        if(!name || !email || !contactNo || !location){
            res.json({success: false, message: "Feild cannot be empty"});
        }

        const user = await userModel.findById(req.user.id);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        user.name = name;
        user.email = email;
        user.contactNo = contactNo;
        user.location = location;

        await user.save();
        res.json({success: true, message: ""})
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

const oneBookingOfUser = async (req, res) => {
    try{
        const {id} = req.params;

        const booking = await bookingModel.findById(id)
        .populate('cafe', 'image tableCharge name'); 
        if(!booking){
            return res.json({success: false, message: "Booking not found"});
        }

        res.json({success: true, message: "cafe send", booking})
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}


export {userLogin, userSignup, forgotPassword, resetPassword, makeNewPasswordFromForgot, userProfile, saveCafeToUser, savedCafes, bookedCafes, ProfileChangePassword, deleteUserAccount, updateUserDetails, removeCafeFromWishlist, oneBookingOfUser}