const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");


// Auth routes
router.post("/register", register);
router.post("/login", login);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
  });

  res.json({ message: "Logged out successfully" });
});

// ✅ /me route OUTSIDE logout
router.get("/me", verifyToken, (req, res) => {
  res.json({
    id: req.user.id,
    role: req.user.role,
  });
});

module.exports = router;