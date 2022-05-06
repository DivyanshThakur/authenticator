import * as User from "../utils/helper.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "express-async-handler";

/**
 * @desc SignUp User
 * @route POST /signup
 * @access Public
 */
export const userSignUp = asyncHandler(async (req, res) => {
  const { username, password, lname, fname } = req.body;

  const userExists = User.findOne(username);

  if (userExists) {
    throw new ErrorResponse("username already exists", 400);
  }

  const hashedPassword = await User.hashPassword(password);

  User.create({
    username,
    password: hashedPassword,
    lastname: lname,
    firstname: fname,
  });

  res.json({
    result: true,
    message: "SignUp success. Please proceed to Signin",
  });
});

/**
 * @desc User SignIn
 * @route POST /signin
 * @access Public
 */
export const userSignIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const INVALID_DATA_MESSAGE = "Invalid username/password";

  if (!username || !password) {
    throw new ErrorResponse("Please provide username and password", 400);
  }

  const user = User.findOne(username);

  if (!user) {
    throw new ErrorResponse(INVALID_DATA_MESSAGE, 401);
  }

  const isPasswordMatched = await User.matchPassword(password, user.password);

  if (!isPasswordMatched) {
    throw new ErrorResponse(INVALID_DATA_MESSAGE, 401);
  }

  const token = User.getToken(user);

  res.json({
    result: true,
    jwt: token,
    message: "Signin success",
  });
});
