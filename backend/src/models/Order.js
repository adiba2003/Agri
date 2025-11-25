import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema({
name: String,
price: Number,
quantity: Number,
category: String,
image: String,
});


const orderSchema = new mongoose.Schema({
orderId: { type: String, required: true, unique: true },
items: [orderItemSchema],
totalAmount: Number,
buyerId: String,
farmerId: String,
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
status: {
type: String,
enum: ["pending", "processing", "declined", "cancelled", "completed"],
default: "pending",
},
});


orderSchema.pre("save", function (next) {
this.updatedAt = Date.now();
next();
});


export default orderSchema;