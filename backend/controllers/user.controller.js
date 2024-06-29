import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (req.userId !== user._id.toString()) {
      return next(new ApiError(403, "You can delete only your account!"));
    }
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json(
        new ApiResponse(200, "", "deleted")
    )
  };

  export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    return res.status(200).json(
      new ApiResponse(200,user,"User fetched successfully")
    )
  };