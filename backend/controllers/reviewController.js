import reviewModel from "../models/reviewModel.js";
import cafeModel from "../models/cafeModel.js";
import userModel from "../models/userModel.js";

const addReview = async (req, res) => {
    try{
        const {rating, comment, cafeId} = req.body;
        // const {id} = req.user.id;

        const cafe = await cafeModel.findById(cafeId);
        if(!cafe){
            return res.json({success: false, message: "Cafe not found"});
        }

        const user = await userModel.findById(req.user.id);
        console.log("userId", req.user.id);

        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        const reviewData = {
            rating,
            comment,
            cafe: cafe._id,
            user: user._id
        }

        const newReview = new reviewModel(reviewData);
        await newReview.save();

        user.reviews.push(newReview._id);
        await user.save();

        cafe.reviews.push(newReview._id);
        await cafe.save();

        res.json({success: true, message: "Review added successfully"});
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

const allReview = async (req, res) => {
    try{
        const {cafeId} = req.body;

        const cafe = await cafeModel.findById(cafeId)
       .populate({
            path: "reviews",
            populate: [
                { path: "user", select: "name" },
               // Optional: only if you want full cafe data in each review
            ]
        });

        if(!cafe){
            return res.json({success: false, message: "Cafe not found"});
        }

        const reviews = cafe.reviews;

        res.json({success: true, reviews})
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

export {addReview, allReview};