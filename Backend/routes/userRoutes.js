import express from "express";
import { isAuthorized } from "../middleware/auth.js";
import {
  register,
  login,
  logout,
  getUser,
} from "../controllers/userController.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);
router.get("/getuser", isAuthorized, getUser);
export default router;
