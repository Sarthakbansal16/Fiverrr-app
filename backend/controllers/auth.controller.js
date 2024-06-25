import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {asyncHandler} from "../utils/AsyncHandler.js"

export const register = async (req, res, next) => {
  try {
    console.log(req.body)
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = await User.create({
      ...req.body,
      password: hash,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, newUser, "User registered Successfully"));
  } catch (error) {
    next(error); 
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(new ApiError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(new ApiError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;

    const options = {
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("accessToken", token, options)
      .json(
        new ApiResponse(
          200,
          {
            user: info,
            token,
          },
          "User logged in successfully"
        )
      );
  } catch (err) {
    next(err);
  }
};

const logoutUser = asyncHandler(async(req,res) => {
  const options = {
      httpOnly: true,
      secure:true,
      sameSite: "none"
  }

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .json(new ApiResponse(200,{},"User Logged Out"))
})