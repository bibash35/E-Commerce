const { signup, login, getAllUsers, getLoggedUser,  } = require("../controller/user");
const express = require("express");
const checkValidationSchmea = require("../middelware/checkValidationSchema");
const Joi = require("joi");
const { checkAuthentication } = require("../middelware/ticket");
const router = express.Router();


const signupValidationSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': 'First name is required',
      'string.empty': 'First name is required',
    }),

  lastName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': 'Last name is required',
      'string.empty': 'Last name is required',
    }),

  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .required()
    .messages({
      'string.pattern.base': 'Email must be a valid Gmail address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
    }),

  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'",.<>/?]).{8,}$'
      )
    )
    .required()
    .messages({
      'string.pattern.base':
        'Password must include uppercase, lowercase, number, and special character',
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm password does not match',
      'any.required': 'Confirm password is required',
    }),

  role: Joi.string()
    .required()
    .messages({
      'any.required': 'Role is required',
      'string.empty': 'Role is required',
    }),
});

const loginValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // allow any email, or restrict as needed
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
    }),
});

  
router.post("/signup",checkValidationSchmea(signupValidationSchema),signup);
router.post("/login", checkValidationSchmea(loginValidationSchema), login);
router.post("/login", login);
router.get("/get-user",checkAuthentication, getLoggedUser);
router.get("/getAllUsers", getAllUsers);

module.exports = router;   