import { ApiError } from "../util/ApiError.js";
import { asyncHandler } from "../util/asyncHandler.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/constants.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        throw new ApiError(401, "Unauthorized");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
