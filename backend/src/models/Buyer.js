import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userDB } from "../config/db.js"; 

const buyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/,
        "Email must be a valid Gmail or Yahoo address"
      ],
    },

    password: { type: String, required: true },

    role: { type: String, default: "buyer" },
  },
  { timestamps: true }
);

buyerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default userDB.model("Buyer", buyerSchema);
