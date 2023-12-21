import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_EXPIRE, JWT_SECRET } from "../constants.js";

// Function to validate Indian phone numbers
function validateIndianPhoneNumber(phoneNumber) {
  const phoneRegex = /^[6-9]\d{9}$/;
  phoneNumber = phoneNumber.replace(/[\s-]+/g, "");
  return phoneRegex.test(phoneNumber);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  phone: {
    type: String,
    required: [true, "Please Enter Your Phone Number"],
    unique: true,
    validate: {
      validator: validateIndianPhoneNumber,
      message: "Please Enter a valid Indian Phone Number",
    },
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    required: [true, "Please enter your email address"],
    validate: {
      validator: function (value) {
        if (value) {
          return validator.isEmail(value);
        }
        return true;
      },
      message: "Please Enter a valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = new mongoose.model("User", userSchema);
