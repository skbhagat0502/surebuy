import mongoose from "mongoose";

const banerSchema = new mongoose.Schema({
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

export const Baner = new mongoose.model("Baner", banerSchema);
