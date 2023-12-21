import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  variant: {
    type: String,
    required: [true, "Please enter a variant!"],
  },
});

export const Variant = new mongoose.model("Variant", variantSchema);
