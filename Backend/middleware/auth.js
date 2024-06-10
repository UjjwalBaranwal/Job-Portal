import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error";
import { User } from "../models/userSchema.js";
export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});
