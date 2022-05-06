import asyncHandler from "express-async-handler";
import * as yup from "yup";
import ErrorResponse from "../utils/ErrorResponse.js";

/* CONSTANTS */

// Error Messages
const EMPTY_FIELD_MESSAGE = "fields can't be empty";
const USERNAME_ERROR_MESSAGE = "username check failed";
const PASSWORD_ERROR_MESSAGE = "password check failed";
const NAME_ERROR_MESSAGE = "fname or lname check failed";

// Regrex
const ONLY_ENGLISH_ALPHABETS = /^[aA-zZ\s]+$/;
const ONLY_LOWERCASE_ALPHABETS = /^[a-z\s]+$/;
const PASSWORD_REGREX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^@$!%*#?&]/;

const userRegisterSchema = yup.object({
  username: yup
    .string(USERNAME_ERROR_MESSAGE)
    .required(EMPTY_FIELD_MESSAGE)
    .min(4, USERNAME_ERROR_MESSAGE)
    .matches(ONLY_LOWERCASE_ALPHABETS, USERNAME_ERROR_MESSAGE),
  password: yup
    .string()
    .required(EMPTY_FIELD_MESSAGE)
    .min(5, PASSWORD_ERROR_MESSAGE)
    .matches(PASSWORD_REGREX, PASSWORD_ERROR_MESSAGE),
  fname: yup
    .string()
    .required(EMPTY_FIELD_MESSAGE)
    .matches(ONLY_ENGLISH_ALPHABETS, NAME_ERROR_MESSAGE),
  lname: yup
    .string()
    .required(EMPTY_FIELD_MESSAGE)
    .matches(ONLY_ENGLISH_ALPHABETS, NAME_ERROR_MESSAGE),
});

const userValidation = () =>
  asyncHandler(async (req, _res, next) => {
    const studentData = req.body;
    try {
      await userRegisterSchema.validate(studentData);
    } catch (error) {
      throw new ErrorResponse(error.message, 400);
    }

    next();
  });

export default userValidation;
