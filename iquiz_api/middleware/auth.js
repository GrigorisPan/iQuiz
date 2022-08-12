const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Users = require('../models/User');
const crypto = require('crypto');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  /*   else if (req.cookies.token){
    token = req.cookies.token
  } */

  //Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded.exp);
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      return next(new ErrorResponse('Invalid Token', 401));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});

//Renew Access and Refresh Token
exports.renew = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.refreshToken) {
    token = req.cookies.refreshToken;
  }
  //Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    req.user = await Users.findByPk(decoded.id);
    req.token = token;

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});

//Protect routes
exports.protectSystemsComm = asyncHandler(async (req, res, next) => {
  let systemToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    systemToken = req.headers.authorization.split(' ')[1];
  }

  //   else if (req.cookies.token){
  //  token = req.cookies.token
  // }

  //Make sure token exists
  if (!systemToken) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(
      systemToken,
      process.env.SYSTEMS_COMM_SECRET_KEY
    );
    if (decoded.pass !== process.env.SYSTEMS_COMM_PASS) {
      return next(new ErrorResponse('Invalid System Token', 401));
    }
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});
