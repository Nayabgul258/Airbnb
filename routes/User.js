const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../Utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const UserController = require("../controller/user");

router.get("/signup",(UserController.renderSignupForm) );


router.post("/signup", wrapAsync(UserController.signup));

router.get("/login",(UserController.renderLoginForm));

router.post("/login", saveRedirectUrl,
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),

    (UserController.login)
);

router.get("/logout",(UserController.logout) );


module.exports = router;