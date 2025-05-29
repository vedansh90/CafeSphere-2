import express from 'express'
import { createOrder, updateStatus, verify } from '../controllers/paymentController.js';

const paymentRouter = express();

paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify", verify);
paymentRouter.put("/update-status", updateStatus);

export default paymentRouter