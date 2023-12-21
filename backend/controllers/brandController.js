import { Brand } from "../models/brandModel.js";
import ErrorHander from "../utils/errorhander.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import { Model } from "../models/modelModel.js";
import ApiFeatures from "../utils/apifeatures.js"; // Adjust the path accordingly

// Create Brand -- Admin
export const createBrand = catchAsyncErrors(async (req, res, next) => {
  const { brand, image } = req.body;
  if (!image || !brand)
    return next(
      new ErrorHander("Please enter both logo and name of the brand!", 404)
    );

  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "brands",
  });

  const imagesLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.image = imagesLink;

  const newBrand = await Brand.create(req.body);

  res.status(201).json({
    success: true,
    newBrand,
  });
});

// Get All Brands

export const getAllBrands = catchAsyncErrors(async (req, res, next) => {
  const brands = await Brand.find();
  res.status(200).json({
    success: true,
    brands,
  });
});

// Get All Brands (Admin)
export const getAdminBrands = catchAsyncErrors(async (req, res, next) => {
  const brands = await Brand.find();
  res.status(200).json({
    success: true,
    brands,
  });
});

// Get Brand Details
export const getBrandDetails = catchAsyncErrors(async (req, res, next) => {
  const brandDetails = await Brand.findById(req.params.id);
  const modelsOfParticularBrand = await Model.find({ brandId: req.params.id });
  if (!brandDetails) {
    return next(new ErrorHander("Brand not found", 404));
  }
  const brand = { ...brandDetails.toObject(), modelsOfParticularBrand };
  res.status(200).json({
    success: true,
    brand,
  });
});

// Update Brand -- Admin
export const updateBrand = catchAsyncErrors(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHander("Brand not found", 404));
  }

  // Images Start Here
  const image = req.body.image;

  if (image !== undefined) {
    await cloudinary.v2.uploader.destroy(brand.image.public_id);

    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "brands",
    });

    const imagesLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    req.body.image = imagesLink;
  }

  brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    brand,
  });
});

// Delete Brand--Admin
export const deleteBrand = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHander("Brand not found", 404));
  }

  await cloudinary.v2.uploader.destroy(brand.image.public_id);

  await brand.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Brand Deleted Successfully",
  });
});
