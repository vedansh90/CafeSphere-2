import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    location: {type: String, required: true},
    contactNo: {type: Number, required: true},
    image: {type: String, default:'https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?uid=R188202810&ga=GA1.1.1482550023.1722440995&semt=ais_hybrid'},
    resetOTP: {
        type: String, // for otp forgot password
    },
    otpExpiry: {
        type: Date, // Expiry time for OTP
    },
    bookings : [{type: mongoose.Schema.Types.ObjectId, ref: "Booking"}],
    savedCafes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cafe" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    profilePhoto: {
    data: Buffer,
    contentType: String,
  },
});

const userModel = mongoose.model('User', userSchema)

export default userModel