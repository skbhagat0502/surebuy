import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  getAllCuts,
  createCut,
  updateCut,
  getAdminCuts,
  getCutDetails,
} from "../controllers/cutController.js";
const router = express.Router();
router.use(express.json());

router
  .route("/admin/cuts")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCuts);

router
  .route("/cut/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCutDetails);

router.route("/cuts").get(getAllCuts);

router
  .route("/admin/cut/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCut);

router
  .route("/admin/cut/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCut);

export default router;
