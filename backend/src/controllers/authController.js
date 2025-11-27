import Farmer from "../models/Farmer.js";
import Buyer from "../models/Buyer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;


    let Model;


    if (role === "farmer") Model = Farmer;
    else if (role === "buyer") Model = Buyer;
    else return res.status(400).json({ message: "Invalid role" });


    const exists = await Model.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });


    const user = await Model.create({ name, email, password, role });


    res.json({ message: "Registration successful", role });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};




export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;


    let Model;


    if (role === "farmer") Model = Farmer;
    else if (role === "buyer") Model = Buyer;
    else return res.status(400).json({ message: "Invalid role" });


    const user = await Model.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found in this role" });


    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect password" });


    res.json({
      message: "Login successful",
      userId: user._id,
      role: user.role,
    });


  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};
