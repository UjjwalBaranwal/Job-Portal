import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/token.js";
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("pls fill all the data"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  //   res.status(200).json({
  //     success: true,
  //     message: "user registered",
  //     user,
  //   });
  sendToken(user, 200, res, "User registed succesfully");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Fill fill the form", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invaid Email or Password", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with this Role is not existed"));
  }
  sendToken(user, 200, res, "User Login Successfully");
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      succcess: true,
      message: "Logged Out successfully",
    });
});
