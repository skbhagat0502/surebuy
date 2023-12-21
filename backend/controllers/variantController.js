import { Variant } from "../models/variantModel.js";
import ErrorHander from "../utils/errorhander.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

// Create variant -- Admin
export const createVariant = catchAsyncErrors(async (req, res, next) => {
  if (!req.body) return next(new ErrorHander("Please enter a variant!", 400));
  const newVariant = await Variant.create(req.body);
  res.status(201).json({
    success: true,
    newVariant,
  });
});

// Get All Variants
export const getAllVariants = catchAsyncErrors(async (req, res, next) => {
  const variants = await Variant.find();
  res.send({
    success: true,
    variants,
  });
});

// Get All Variants--admin
export const getAdminVariants = catchAsyncErrors(async (req, res, next) => {
  const variants = await Variant.find();
  res.send({
    success: true,
    variants,
  });
});

// Update Variant -- Admin
export const updateVariant = catchAsyncErrors(async (req, res, next) => {
  let variant = await Variant.findById(req.params.id);

  if (!variant) {
    return next(new ErrorHander("Variant not found", 404));
  }

  variant = await Variant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    variant,
  });
});

// Delete Variant--Admin
export const deleteVariant = catchAsyncErrors(async (req, res, next) => {
  const variant = await Variant.findById(req.params.id);

  if (!variant) {
    return next(new ErrorHander("Variant not found", 404));
  }

  await variant.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Variant Deleted Successfully",
  });
});
