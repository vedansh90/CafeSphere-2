import mongoose, { mongo } from "mongoose";

const cafeSchema = mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    password : {type: String, required: true},
    ownerName: {type:String, required: true},
    location: {type:String, required: true},
    city: {type:String, required: true},
    image: {type:String, default:'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhZmV8ZW58MHx8MHx8fDA%3D'},
    categories: {type:[String],},
    contactNo: {type:Number, required: true},
    bookings : [{type: mongoose.Schema.Types.ObjectId, ref: "Booking"}],
    menu: [{type: mongoose.Schema.Types.ObjectId, ref: "Menu"}],
    drink: [{type: mongoose.Schema.Types.ObjectId, ref: "Drink"}],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    tableCharge: {type: Number, required:true},
    isOpen: {type: Boolean, default: false}
}, {minimize:false})

const cafeModel = mongoose.model('Cafe', cafeSchema)

export default cafeModel