import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Please select a brand!"],
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

export const Brand = new mongoose.model("Brand", brandSchema);
