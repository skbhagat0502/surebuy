import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  getAllVariants,
  createVariant,
  deleteVariant,
  updateVariant,
  getAdminVariants,
} from "../controllers/variantController.js";
const router = express.Router();
router.use(express.json());

router
  .route("/admin/variants")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminVariants);

router.route("/variants").get(getAllVariants);

router
  .route("/admin/variant/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createVariant);

router
  .route("/admin/variant/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteVariant);

router
  .route("/admin/variant/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateVariant);

export default router;
