import mongoose from "mongoose";

const cutSchema = new mongoose.Schema({
  Id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  cut: {
    type: Number,
    required: true,
  },
});

export const Cut = mongoose.model("Cut", cutSchema);
