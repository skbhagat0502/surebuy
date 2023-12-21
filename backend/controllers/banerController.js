import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Baner } from "../models/banerModel.js";
import ErrorHandler from "../utils/errorhander.js";
import cloudinary from "cloudinary";

export const uploadBaner = catchAsyncErrors(async (req, res, next) => {
  const { image } = req.body;
  if (!image) {
    return next(new ErrorHandler("Please upload an image!"));
  }

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "baners",
  });

  const imageLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.image = imageLink;
  const baner = await Baner.create(req.body);
  res.status(201).json({
    success: true,
    baner,
  });
});
export const getAllBaners = catchAsyncErrors(async (req, res, next) => {
  const baners = await Baner.find();
  res.status(200).json({
    success: true,
    baners,
  });
});
export const deleteBaner = catchAsyncErrors(async (req, res, next) => {
  const baner = await Baner.findById(req.params.id);
  if (!baner) {
    return next(new ErrorHandler("Baner not found", 404));
  }
  await cloudinary.v2.uploader.destroy(baner.image.public_id);
  await baner.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Baner Deleted Successfully",
  });
});
