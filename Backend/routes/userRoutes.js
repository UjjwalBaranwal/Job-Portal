import express from "express";
import { isAuthorized } from "../middleware/auth.js";
import { register, login, logout } from "../controllers/userController.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);
export default router;
