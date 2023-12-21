import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  getAllBrands,
  createBrand,
  deleteBrand,
  updateBrand,
  getAdminBrands,
  getBrandDetails,
} from "../controllers/brandController.js";
const router = express.Router();
router.use(express.json());

router.route("/brands").get(getAllBrands);

router
  .route("/admin/brands")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminBrands);

router.route("/brand/:id").get(getBrandDetails);

router
  .route("/admin/brand/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBrand);

router
  .route("/admin/brand/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBrand);

router
  .route("/admin/brand/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBrand);

export default router;
