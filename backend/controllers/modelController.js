import { Model } from "../models/modelModel.js";
import { Brand } from "../models/brandModel.js";
import ErrorHander from "../utils/errorhander.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import { Cut } from "../models/cutModel.js";

// Create Model -- Admin
export const createModel = catchAsyncErrors(async (req, res, next) => {
  const image = req.body.image;
  const brandDetails = await Brand.findById({ _id: req.body.brand });
  req.body.brandId = req.body.brand;
  req.body.brand = brandDetails.brand;
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "models",
  });

  const imagesLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  req.body.image = imagesLink;
  const model = await Model.create(req.body);
  res.status(201).json({
    success: true,
    model,
  });
});

// Get All Models
export const getAllModels = catchAsyncErrors(async (req, res, next) => {
  const models = await Model.find();
  res.status(200).json({
    success: true,
    models,
  });
});

// Get All Model (Admin)
export const getAdminModels = catchAsyncErrors(async (req, res, next) => {
  const models = await Model.find();
  res.status(200).json({
    success: true,
    models,
  });
});

// Get Model Details
export const getModelDetails = catchAsyncErrors(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(new ErrorHander("Model not found!", 404));
  }

  res.status(200).json({
    success: true,
    model,
  });
});

// Update Model -- Admin
export const updateModel = catchAsyncErrors(async (req, res, next) => {
  let model = await Model.findById(req.params.id);

  if (!model) {
    return next(new ErrorHander("Model not found", 404));
  }

  const image = req.body.image;

  if (image !== undefined) {
    await cloudinary.v2.uploader.destroy(model.image.public_id);

    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "models",
    });

    const imagesLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    req.body.image = imagesLink;
  }

  model = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    model,
  });
});

// Delete Model--Admin
export const deleteModel = catchAsyncErrors(async (req, res, next) => {
  const model = await Model.findById(req.params.id);

  if (!model) {
    return next(new ErrorHander("Model not found!", 404));
  }

  await cloudinary.v2.uploader.destroy(model.image.public_id);

  await model.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Model Delete Successfully",
  });
});

export const calculatePrice = catchAsyncErrors(async (req, res, next) => {
  const deviceCondition = req.body.result;
  const price = req.body.price;
  let newPrice = price;
  let id44 = false;
  let id45 = false;

  for (const singleCondition of deviceCondition) {
    if (singleCondition.id === 1 && singleCondition.selectedOption === "No") {
      const cutPercentage = await Cut.findOne({ Id: 1 });
      if (cutPercentage) {
        newPrice = newPrice - (newPrice * cutPercentage.cut) / 100;
      }
    } else if (
      singleCondition.id === 2 &&
      singleCondition.selectedOption === "No"
    ) {
      const cutPercentage = await Cut.findOne({ Id: 2 });
      if (cutPercentage) {
        newPrice = newPrice - (newPrice * cutPercentage.cut) / 100;
      }
    } else if (
      singleCondition.id === 3 &&
      singleCondition.selectedOption === "No"
    ) {
      const cutPercentage = await Cut.findOne({ Id: 3 });
      if (cutPercentage) {
        newPrice = newPrice - (newPrice * cutPercentage.cut) / 100;
      }
    } else if (singleCondition.id === 44) {
      id44 = true;
    } else if (singleCondition.id === 45) {
      id45 = true;
    } else if (
      singleCondition.id < 46 &&
      singleCondition.id !== 1 &&
      singleCondition.id !== 2 &&
      singleCondition.id !== 3 &&
      singleCondition.id !== 44 &&
      singleCondition.id !== 45
    ) {
      const cutPercentage = await Cut.findOne({ Id: singleCondition.id });
      if (cutPercentage) {
        newPrice = newPrice - (newPrice * cutPercentage.cut) / 100;
      }
    }
  }
  const cutPercentage = await Cut.findOne({ Id: 46 });
  if (cutPercentage) {
    newPrice = newPrice - (newPrice * cutPercentage.cut) / 100;
  }
  if (!id44) {
    const cutPercentage48 = await Cut.findOne({ Id: 44 });
    if (cutPercentage48) {
      newPrice = newPrice - (newPrice * cutPercentage48.cut) / 100;
    }
  }
  if (!id45) {
    const cutPercentage49 = await Cut.findOne({ Id: 45 });
    if (cutPercentage49) {
      newPrice = newPrice - (newPrice * cutPercentage49.cut) / 100;
    }
  }

  res.status(200).json({ success: true, newPrice });
});
