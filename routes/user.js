const express=require("express");
const router=express();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/user.js");


router.get("/signup",(userController.renderSignup));

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",(userController.renderLogin));

router.post("/login",saveRedirectUrl, passport.authenticate("local", {
    failureFlash: true,  // Enables flash messages for authentication failures
    failureRedirect: "/login",  // Redirects to the login page on failure
}), userController.login);


router.get("/logout", userController.logout);
 
module.exports=router;