const express = require("express");
const { register, login, logout } = require("../controllers/userController");
const { isNotLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/register").post(isNotLoggedIn , register);
router.route("/login").post(isNotLoggedIn, login);
router.route("/logout").get(logout);

module.exports = router;