import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  usersAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItem: {
    type: mongoose.Schema.ObjectId,
    ref: "Model",
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  itemCondition: {
    type: [],
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  receivingCost: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "successfull",
  },
  receivedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = new mongoose.model("Order", orderSchema);
