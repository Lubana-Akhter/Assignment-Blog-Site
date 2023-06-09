const User = require("../models/user.js");
const { hashPassword, comparePassword } = require("../helpers/auth.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    // destructure name, email, password from req.body
    const { name, email, password } = req.body;
    // all fields require validation
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    // 5. register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // send response
    res.json({message:"Registration successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    // destructure name, email, password from req.body
  const { email, password } = req.body
  // all fields require validation
  if (!email) {
    return res.json({ error: "Email is required" })
  }
  if (!password || password.length < 6) {
    return res.json({ error: "Password must be at least 6 characters long" });
  }
   // check if email is taken
   const user = await User.findOne({ email });
   if (!user) {
     return res.json({ error: "User not found" });
   }
   // compare password
   const match = await comparePassword(password, user.password);
   if (!match) {
     return res.json({ error: "Email or Password is not valid" });
   }
    //  create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // send response
    res.json({message:"login success",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

