import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import cafeownerRouter from './routes/cafeownerRoute.js'
import userRouter from './routes/userRoute.js'
import cafeRouter from './routes/cafeRoute.js'
import "./utils/tokenScheduler.js";
import paymentRouter from './routes/paymentRoute.js'
import reviewRouter from './routes/reviewRoute.js'



// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const connectDB = require('./config/mongodb.js');
// const connectCloudinary = require('./config/cloudinary.js');
// const cafeownerRouter = require('./routes/cafeownerRoute.js');
// const userRouter = require('./routes/userRoute.js');
// const express = require('express');
// const cafeRouter = require('./routes/cafeRoute.js');

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
console.log("Loaded JWT Secret:", process.env.JWT_SECRET);


app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}))

// app.post('/upload', parser.single('image'), (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }
      
//       console.log("Image upload successful:", req.file);
      
//       // Choose the appropriate property based on your storage
//       const imageUrl = req.file.path || req.file.location || req.file.url;
      
//       if (!imageUrl) {
//         return res.status(500).json({ error: 'Failed to determine file URL' });
//       }
      
//       res.json({ imageUrl });
//     } catch (error) {
//       console.error("Upload error:", error);
//       res.status(500).json({ error: 'File upload failed' });
//     }
//   });
  



// Api endpoints
app.use("/owner", cafeownerRouter); 
app.use("/user", userRouter)
app.use("/cafe", cafeRouter)
app.use("/payment", paymentRouter)
app.use("/review", reviewRouter)
  

app.get("/", (req, res) => {
    res.send("Api working great");
});

app.listen(port, () => {
    console.log("Server Started.....")
})