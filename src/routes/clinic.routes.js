const express = require("express");
const router = express.Router();

const {
  createClinic,
  getClinics,
  getClinicById,
  updateClinic,
  deleteClinic,
} = require("../controllers/clinic.controller");

const { verifyToken } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

// CREATE (Admin Only)
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  createClinic
);

// GET ALL (Public or Authenticated)
router.get("/", verifyToken, getClinics);

// GET ONE
router.get("/:id", verifyToken, getClinicById);

// UPDATE (Admin Only)
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  updateClinic
);

// DELETE (Admin Only)
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteClinic
);

module.exports = router;