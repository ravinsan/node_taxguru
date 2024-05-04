import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../util/constants.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";




export const signup = async (req, res) => {
    console.log(req.body)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profileImage: req.body.profileImage,
        isAdmin: req.body.isAdmin
    });

    await newUser.save();

   res.send(newUser);
}

export const signin = async (req, res) => {
    const { email, username, password } = req.body;
  
    // Checking if either username or email is provided
    if (!(username || email)) {
      throw new ApiError(400, "Email or Username is required");
    }
  
    try {
      // Finding user by email or username in the database
      const user = await User.findOne({ $or: [{ email }, { username }] });
  
      // If user doesn't exist
      if (!user) {
        throw new ApiError(404, "User does not exist");
      }
  
      // Checking if the provided password is correct
      // isPasswordCorrect is a method defined in the user model
      const isPasswordValid = await user.isPasswordCorrect(password);
  
      // If the password is not valid
      if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
      }
  
      //  remove the password from the user object
      const { password: userPassword, ...userWithoutPassword } = user._doc;
  
      // Generating a JWT token
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET);
      const options = {
        httpOnly: true,
        secure: true,
      };
  
      // Return a response with the user details and access token
      return res
        .status(200)
        .cookie("accessToken", token, options)
        .json(new ApiResponse(200, { userWithoutPassword }));
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            error.statusCode || 500,
            null,
            error.message || "Internal Server Error",
            false
          )
        );
    }
  };