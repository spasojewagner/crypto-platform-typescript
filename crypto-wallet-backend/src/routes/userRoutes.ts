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
} from "../controllers/UserController";

// Create router instance correctly
const router = Router();

// Authentication routes - use explicit method calls
router.post("/register", register);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

// User routes
router.get("/users", protectRoute, getAllUsers);
router.get("/users/:userId", protectRoute, getUserById);

export default router;
