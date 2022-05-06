import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/ErrorResponse.js";
import config from "../utils/config.js";
import * as User from "../utils/helper.js";

const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ErrorResponse("Please provide a JWT token", 401);
  }

  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    const user = User.findOne(decoded.username);

    req.user = user;

    next();
  } catch (error) {
    throw new ErrorResponse("JWT Verification Failed", 401);
  }
});

export { protect };
