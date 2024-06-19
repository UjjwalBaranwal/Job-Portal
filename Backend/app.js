import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import userRouter from "./routes/userRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
// import applicationRouter from "./routes/applicationRoutes.js";
import { dbConnection } from "./database/dbConnection.js";
import ErrorHandler, { errorMiddleware } from "./middleware/error.js";
const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "POST"],
    credential: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobsRouter);
// app.use("/api/v1/application", applicationRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
