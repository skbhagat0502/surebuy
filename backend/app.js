import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { NODE_ENV } from "./constants.js";
import { errorMiddleware } from "./middleware/error.js";
import dotenv from "dotenv";

// Config
if (NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
import model from "./routes/modelRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import brand from "./routes/brandRoute.js";
import variant from "./routes/variantRoute.js";
import cut from "./routes/cutRoute.js";
import baner from "./routes/banerRoute.js";

app.use("/api/v1", model);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", brand);
app.use("/api/v1", variant);
app.use("/api/v1", cut);
app.use("/api/v1", baner);
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "healthy", message: "sure buy server is running well!" });
});
// Middleware for Errors
app.use(errorMiddleware);

export default app;
