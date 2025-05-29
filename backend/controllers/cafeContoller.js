import { model } from 'mongoose';
import bookingModel from '../models/bookingModel.js';
import cafeModel from '../models/cafeModel.js';
import userModel from '../models/userModel.js';

const getCafe = async (req, res) => {
    try{
        const cafe = await cafeModel.findById(req.params.id)
        .populate({
            path: "menu",
            model: "Menu",
            select: "itemName price",
        })
        .populate({
            path: "drink",
            model: "Drink",
            select: "itemName price"
        });
        if (!cafe) {
            return res.json({success: false, message: "Cafe not found" });
        }
        res.json(cafe);
    }
    catch(err){
        res.json({ success: false, message: "Error fetching cafe details", err });
    }
}

const searchCafe = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        let cafes = await cafeModel.find({
          name: { $regex: searchQuery, $options: "i" },
        }).limit(15);

        if (cafes.length === 0) {
            cafes = await cafeModel.aggregate([{ $sample: { size: 5 } }]);
          }
        res.json(cafes);
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
}

const bookCafe = async (req, res) => {

    try{
        const cafeid = req.params.id;
        console.log("backend")
        console.log(cafeid);
        // const userId = req.user._id
        // console.log(userId);

        const {bookingName, email, contactNo, guests, date, timeSlot, partyType, specialRequests} = req.body;

        if(!bookingName || !email || !contactNo || !guests){
            return res.json({success: false, message: "All feilds are required"})
        }

        const cafe = await cafeModel.findById(cafeid);

        if(!cafe){
            return res.json({success: false, message: "Cafe not found"})
        }
        
        const bookingData = {
            user: req.user.id,
            bookingName, 
            cafe: cafe._id,
            email,
            contactNo,
            guests,
            date,
            timeSlot,
            partyType,
            specialRequests,
        };

        const newBooking = new bookingModel(bookingData);
        await newBooking.save();

        cafe.bookings.push(newBooking._id);
        await cafe.save();

        const userr = await userModel.findById(req.user.id);

        userr.bookings.push(newBooking._id);
        await userr.save();

        res.json({success: true, message: "Booking Successfull", newBooking});
    }
    catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }
}

const getLocationCafes = async (req, res) => {
    try{
        console.log(req.user);
        console.log("done");

        const id = req.user.id;
        const user = await userModel.findById(id);
        const useraddress = user.location;

        const parts = useraddress.split(",")
        const firstPart = parts[0].trim(); 
        const secondPart = parts[1]?.trim(); 
        const searchQuery1 = firstPart.toLowerCase();
        const searchQuery2 = secondPart.toLowerCase();

        console.log(searchQuery2);
        console.log(searchQuery1);

        let cafes = await cafeModel.find({
            $or: [
              { location: { $regex: searchQuery1, $options: "i" } }, // Match full address
              { city: { $regex: searchQuery2, $options: "i" } }, // Match city
            ],
          });

        // if(cafes.length < 4){
        //     const addtionalCafes = await cafeModel.aggregate([{ $sample: { size: 5 } }]);
        //     cafes.push(...addtionalCafes);
        // }  

        if (cafes.length < 8) {
            const needed = 8 - cafes.length;
            const additionalCafes = await cafeModel.aggregate([{ $sample: { size: needed } }]);

            cafes.push(...additionalCafes);
        }


        console.log(cafes);
        res.json(cafes); 
    }catch(err){
        console.log(err.message);
        res.json({success: false, message: "fjfjfb"})
    }
}

const getCafeByCategory = async (req, res) => {
    try{
        const category = req.params.category;
        const cafes = await cafeModel.find({categories: category});

        if(!cafes){
            return res.json({success: false, message: "Cafes not found"});
        }

        res.json({success: true, cafes});

    }
    catch(err){
        res.json({success: false, message: err.message})
    }
}

export {getCafe, bookCafe, searchCafe, getLocationCafes, getCafeByCategory}