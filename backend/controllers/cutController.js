import { Cut } from "../models/cutModel.js";
import ErrorHander from "../utils/errorhander.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

// Create Cut -- Admin
export const createCut = catchAsyncErrors(async (req, res, next) => {
  if (!req.body) return next(new ErrorHander("Please enter a cut!", 400));
  const newCut = await Cut.create(req.body);
  res.status(201).json({
    success: true,
    newCut,
  });
});

// Get All Cuts
export const getAllCuts = catchAsyncErrors(async (req, res, next) => {
  const cuts = await Cut.find();
  res.send({
    success: true,
    cuts,
  });
});

// Get All Cuts--admin
export const getAdminCuts = catchAsyncErrors(async (req, res, next) => {
  const cuts = await Cut.find();
  res.send({
    success: true,
    cuts,
  });
});

// Update Cut -- Admin
export const updateCut = catchAsyncErrors(async (req, res, next) => {
  let cut = await Cut.findById(req.params.id);
  if (!cut) {
    return next(new ErrorHander("Cut not found", 404));
  }
  cut = await Cut.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    cut,
  });
});
// Get cut Details
export const getCutDetails = catchAsyncErrors(async (req, res, next) => {
  const cut = await Cut.findById(req.params.id);
  if (!cut) {
    return next(new ErrorHander("Cut not found!", 404));
  }

  res.status(200).json({
    success: true,
    cut,
  });
});
