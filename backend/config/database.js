import mongoose from "mongoose";
import { DB_URI } from "../constants.js";

export const connectDatabase = () => {
  mongoose.connect(DB_URI).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};
