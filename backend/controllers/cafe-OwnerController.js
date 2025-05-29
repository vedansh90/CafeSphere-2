import validator from 'validator'
import {v2 as cloudinary} from 'cloudinary'
import cafeModel from '../models/cafeModel.js';
import cafeOwnerModel from '../models/cafeOwnerModel.js';
import bcrypt, { compareSync } from 'bcryptjs'
import jwt from "jsonwebtoken"
import userModel from '../models/userModel.js';
import menuModel from '../models/menuModel.js';
import drinkModel from '../models/drinkModel.js';
import { model } from 'mongoose';
import confirmBooking from '../utils/confirmBooking.js';
import bookingModel from '../models/bookingModel.js';
import rejectBooking from '../utils/rejectBooking.js';



const addCafe = async (req, res) => {
    try{
        const {name, email, password, ownerName, location, city, contactNo, tableCharge} = req.body;
        // const imageFile = req.file

        // checking for all data to add cafe
        if(!name || !email ||!ownerName || ! location || !city || !contactNo || !password || !tableCharge){
            return res.json({success: false, message: "Missing details"})
        }

        const newOne = await cafeModel.findOne({email});

        // check is cafe already exists 
        if(newOne){
            return res.json({success: true, message: "Cafe Already exist"})
        }

        // checking for email validation
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email"})
        }

        // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        // const image_url = imageUpload.secure_url

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const cafeData = {
            name, 
            email,
            password: hashedPassword,
            ownerName,
            location,
            city,
            contactNo,
            tableCharge
        }
        
        const newcafe = new cafeModel(cafeData)
        await newcafe.save()

        res.json({success: true, message: "Cafe Added Successfully"})

    }
    catch(err){
        console.log(err)
        res.json({success: false, message: err.message})
    }
}

// get cafe
const getCafes = async (req, res) => {
    try {
        const cafes = await cafeModel.find();
        res.json(cafes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const cafeLogin = async (req, res) => {

    try{
        let {email, password} = req.body;

        const cafe = await cafeModel.findOne({email});

        if(cafe){
            // cafe found
            const isMatch = await bcrypt.compare(password, cafe.password);

            if(!isMatch){
                return res.json({success: false, message: "Incorrect Password"})
            }
            const token = jwt.sign({ id: cafe._id }, "your_secret_key", { expiresIn: "1h" });
            console.log(cafe);
            return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            userId: cafe._id,
            userName: cafe.name 
            });
        }
        else{
            return res.json({success: false, message: "Cafe not found"})
        }
    }
    catch(err) {
        console.log(err)
        return res.json({success: false, message: err.message})
    }

}

const getOneCafe = async (req, res) => {

    try{
        const {id} = req.params;
        const cafe = await cafeModel.findById(id)
        .populate({
            path: "bookings", 
            model: "Booking",
            select: "guests date timeSlot bookingName status email partyType", 
        })
        .populate({
            path: "menu",
            model: "Menu",
            select: "itemName price",
        });

        if(!cafe){
            return res.json({success: false, message: "Cafe Not Found"})
        }
        return res.json(cafe);
    }
    catch(err){
        return res.json({success: false, message: err.message})
    }
}

const AddItemToMenu = async (req, res) => {
    try{

        let {itemName, price} = req.body;
        let {id} = req.params;

        if(!itemName || !price){
            return res.json({success: false, message: "All feilds are required"});
        }

        const cafe = await cafeModel.findById(id);

        if(!cafe){
            return res.json({success: false, message: "Cafe Not found"});
        }

        const newMenu = new menuModel({itemName, price});
        await newMenu.save();

        cafe.menu.push(newMenu._id);
        await cafe.save();

        res.json({success: true, message: "Menu Added"})
    }
    catch(err){
        console.log(err.message);
        return res.json({success: false, message: err.message});
    }
}

const deleleItemFromMenu = async (req, res) => {
    try{
        let {menuId} = req.body;
        let {id} = req.params;

        const cafe = await cafeModel.findOneAndUpdate(
            { _id: id }, 
            { $pull: { menu: menuId } },
            { new: true }
          );
      
          if (!cafe) {
            return res.status(404).json({ message: 'Cafe not found' });
          }
      
          const menuItem = await menuModel.findByIdAndDelete(menuId);
      
          if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
          }

          res.json({success: true, message: "Menu Removed Successfully"});
    }
    catch(err){

    }
}

const AddDrinks = async (req, res) => {
    try{
        const {itemName, price} = req.body;
        const {id} = req.params;

        if(!itemName || !price){
            return res.json({success: false, message: "All feilds are required"});
        }

        const cafe = await cafeModel.findById(id);

        if(!cafe){
            return res.json({success: false, message: "Cafe not found"})
        }

        const newDrink = new drinkModel({itemName, price});
        await newDrink.save();

        cafe.drink.push(newDrink._id);
        await cafe.save();

        res.json({success: true, message: "Drink Added"});
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

const confirmbooking = async (req, res) => {
    try{

        // let {email} = req.body;
        const {id} = req.body;
        
        const booking = await bookingModel.findById(id);
        
        if(!booking){
            return res.json({success: false, message: "Booking not found"})
        }

        booking.status = "Confirmed";
        await booking.save();

        confirmBooking(booking.email, booking.bookingName, booking._id);

        res.json({success: true, message: "Booking confirm"});
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

const rejectbooking = async (req, res) => {
    try{
        const {id} = req.body;

        const booking = await bookingModel.findById(id);

        if(!booking){
            return res.json({success: false, message: "Booking not found"})
        }

        booking.status = "Rejected"
        await booking.save();

        rejectBooking(booking.email, booking.bookingName);

        res.json({success: true, message: "Booking rejected"});
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

const verifyToken = async (req, res) => {
    try{
        const {token} = req.body;

        const booking = await bookingModel.findOne({ token });
        console.log("booking Dtaa", booking)
        if (!booking) {
            return res.json({success: false, message: "Invalid token. number" });
        }

        const currentTime = new Date();
        
        const [hours, minutes] = booking.timeSlot.split(':').map(Number);
        const bookingDateTime = new Date(booking.date);
        bookingDateTime.setHours(hours, minutes, 0, 0);

        const timeDifference = (bookingDateTime - currentTime) / (1000 * 60);

        if (timeDifference > 10) {
            return res.json({
                success: false,
                message: "Token can only be verified within 10 minutes of the booking time.",
            });
        }
      
        booking.status = "Approved";
        await booking.save();
      
        res.json({success: true, message: "Booking approved.", booking });
    }
    catch(err){
        res.json({success: false, message: err.message});
        console.log("Verify token error");
    }
}

const cafeIsOpenOrClose = async (req, res) => {
     const { id } = req.body;

    try {
        const cafe = await cafeModel.findById(id);

    if (!cafe) return res.status(404).json({ message: 'Cafe not found' });

    // Toggle the current isOpen value
    cafe.isOpen = !cafe.isOpen;

    await cafe.save();

    res.json({ message: `Cafe is now ${cafe.isOpen ? 'Open' : 'Closed'}`, isOpen: cafe.isOpen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getCafeStatus = async (req, res) => {
     const { id } = req.params;
        try {
            const cafe = await cafeModel.findById(id);
            if (!cafe) return res.json({ message: 'Cafe not found' });

            res.json({ isOpen: cafe.isOpen });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
}

export {addCafe, getCafes, cafeLogin, getOneCafe, AddItemToMenu, deleleItemFromMenu, AddDrinks, confirmbooking, rejectbooking, verifyToken, cafeIsOpenOrClose, getCafeStatus};