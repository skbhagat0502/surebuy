import express from "express";
import {
  getAllModels,
  createModel,
  updateModel,
  deleteModel,
  getModelDetails,
  getAdminModels,
  calculatePrice,
} from "../controllers/modelController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/models").get(getAllModels);

router
  .route("/admin/models")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminModels);

router
  .route("/admin/model/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createModel);

router
  .route("/admin/model/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateModel)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteModel);

router.route("/model/:id").get(getModelDetails);
router.route("/model/:id").post(isAuthenticatedUser, calculatePrice);

export default router;
