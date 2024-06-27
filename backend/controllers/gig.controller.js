import Gig from "../models/gig.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller)
      return next(new ApiError(403, "Only sellers can create a gig!"));

    const newGig = await Gig.create({
      userId: req.userId,
      ...req.body,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, newGig, "Gig created Successfully"));
    // res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(new ApiError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    return res
      .status(201)
      .json(new ApiResponse(200, "", "Gig has been deleted Successfully"));
  } catch (err) {
    next(err);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(new ApiError(404, "Gig not found!"));
    return res
      .status(201)
      .json(new ApiResponse(200, gig, "Gig fetched Successfully"));
    //res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    return res
      .status(201)
      .json(new ApiResponse(200, gigs, "Gigs fetched Successfully"));
    //res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
