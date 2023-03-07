const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isNotLoggedIn = (req, res, next) => {
  try {
    let token;
    if (req.cookies) {
      token = req.cookies.token;
    }

    if (!token) {
      if (req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "");
      }
    }

    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        function (err, decoded) {
          if (err) {
            return res.json({
              success: false,
              message: "Failed to authenticate token.",
            });
          }

          return decoded;
        }
      );

      return res.status(400).json({
        message: "User is Already Logged in",
        decoded,
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong inside isNotLoggedIn middleware",
      err: err.message,
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;
    if (req.cookies) {
      token = req.cookies;
    }

    if (!token && req.header("Authorization")) {
      token = req.header("Authorization").replace("Bearer ", "");
    }

    if (!token) {
      return res.status(401).json({
        message: "User is not logged in. Please log in to access this route",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong in isLoggedIn middleware",
      error : err.message
    });
  }
};
