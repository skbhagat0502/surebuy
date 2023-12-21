import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Please select a brand!"],
  },
  brandId: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
    required: true,
  },
  model: {
    type: String,
    required: [true, "Please enter the model name!"],
  },
  variants: [
    {
      type: String,
      required: [true, "Please Select atleast one variant!"],
    },
  ],
  price: {
    type: Number,
    required: [true, "Please Enter Model Price!"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const Model = new mongoose.model("Model", modelSchema);
