const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

