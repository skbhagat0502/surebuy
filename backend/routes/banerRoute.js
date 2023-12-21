import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  uploadBaner,
  deleteBaner,
  getAllBaners,
} from "../controllers/banerController.js";
const router = express.Router();

router.use(express.json());

router.route("/baners").get(getAllBaners);

router
  .route("/admin/baner/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBaner);

router
  .route("/admin/baner/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), uploadBaner);

export default router;
