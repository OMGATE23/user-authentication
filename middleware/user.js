const jwt = require("jsonwebtoken");

exports.isNotLoggedIn = (req, res, next) => {
  let token;
  if (req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    if(req.header("Authorization")){
        token = req.header("Authorization").replace("Bearer ", "");
    }
  }

  if (token) {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err , decoded) {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token.",
          });
        }

        return decoded
      }
    );

    return res.status(400).json({
      message: "User is Already Logged in",
      decoded,
    });
  }

  next();
};
