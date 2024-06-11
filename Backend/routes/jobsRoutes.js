import express from "express";
import {
  deleteJob,
  getJobs,
  getMyJobs,
  postJobs,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthorized } from "../middleware/auth.js";
const router = express.Router();
router.get("/getall", getJobs);
router.post("/post", isAuthorized, postJobs);
router.get("/myjob", isAuthorized, getMyJobs);
router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);
export default router;
