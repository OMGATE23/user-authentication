const express = require("express");
const { register, login, logout , changePassword } = require("../controllers/userController");
const { isNotLoggedIn , isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/register").post(isNotLoggedIn , register);
router.route("/login").post(isNotLoggedIn, login);
router.route("/logout").get(logout);
router.route("/password/update").post(isLoggedIn, changePassword);

module.exports = router;