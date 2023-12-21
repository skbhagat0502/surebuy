import { Order } from "../models/orderModel.js";
import { Model } from "../models/modelModel.js";
import ErrorHander from "../utils/errorhander.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { User } from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import newOrderTemplateForOwner from "../emailTemplates/newOrderTemplateForOwner.js";
import { SMTP_MAIL } from "../constants.js";

// Create new Order
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    usersAddress,
    modelId,
    itemCondition,
    itemPrice,
    receivingCost,
    totalPrice,
  } = req.body;
  const message = newOrderTemplateForOwner(req.body);
  const currentUser = await User.findById(req.user._id);
  await sendEmail({
    email: currentUser.email,
    subject: "Your order is on your way!",
    message,
  });
  try {
    await sendEmail({
      email: SMTP_MAIL,
      subject: `New Order!!!`,
      message,
    });
    const orderNumber = (await Order.countDocuments()) + 1;
    const order = await Order.create({
      usersAddress,
      orderItem: modelId,
      itemPrice,
      itemCondition,
      receivingCost,
      orderNumber,
      totalPrice,
      createdAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHander(error.message, 500));
  }
});

// get Single Order--Admin
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email phone"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Received") {
    return next(new ErrorHander("You have already received this order", 400));
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Received") {
    order.receivedAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// delete Order -- Admin
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
});
