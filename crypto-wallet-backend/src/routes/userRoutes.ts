// src/routes/userRoutes.ts
import { Router } from 'express';
import { protectRoute } from "../midleware/auth";
import {
  register,
  login,
  logout,
  updateProfile,
  checkAuth,
  getAllUsers,
  getUserById,
  getInvitationStats,
  sendVerificationCode, verifyCode,
  getVerificationStatus,
  verifyEmail
} from "../controllers/UserController";

// Create router instance correctly
const router = Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

// Invitation routes
router.get("/invitation-stats", protectRoute, getInvitationStats);

// User routes
router.get("/users", protectRoute, getAllUsers);
router.get("/users/:userId", protectRoute, getUserById);

//verifikacija  routes
router.post("/send-verification", protectRoute, sendVerificationCode);
router.post("/verify-email", protectRoute, verifyEmail);
router.get("/verification-status", protectRoute, getVerificationStatus);
export default router;