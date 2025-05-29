import Razorpay from "razorpay";
import bookingModel from "../models/bookingModel.js";

export const instance = new Razorpay({
   key_id : process.env.RAZORPAY_API_KEY,
    key_secret : process.env.RAZORPAY_API_SECRET
})

const createOrder = async (req, res) => {
    const {amount} = req.body;
  try {
    const options = {
      amount: amount,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    console.log(order);
    res.json({ success: true, message: "Payment initiated", order });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const verify = (req, res) => {
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET );
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest === razorpay_signature) {
        res.json({ success: true, msg: "Payment verified successfully" });
    } else {
        res.status(400).json({ msg: "Invalid signature" });
    }
    }
    catch(err){
        res.json({success: false, message: err.message});
    }
}

const updateStatus = async (req, res) => {
  try{
    const {bookingId} = req.body;
    
    const booking = await bookingModel.findById(bookingId);
    if(!booking){
      return res.json({success: false, message: 'Booking Not found'});
    }

    booking.paymentStatus = true;
    await booking.save();

    res.json({success: true, message: "Payment status done"})
  }
  catch(err){
    res.json({success: false, message: err.message});
  }
}


export {createOrder, verify, updateStatus};