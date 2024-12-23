const express=require("express");
const router=express();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try {
        let{username,email,password}=req.body;
    const newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
   // console.log(registeredUser);
   req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome to Wonderlust!");
    res.redirect("/listings");
   })
    
    } catch (error) {
        req.flash("errors",error.message);
        res.redirect("/signup");
    }
    
}));

router.get("/login", (req,res)=>{
    res.render("users/login.ejs");
});


router.post("/login",saveRedirectUrl, passport.authenticate("local", {
    failureFlash: true,  // Enables flash messages for authentication failures
    failureRedirect: "/login",  // Redirects to the login page on failure
}), async (req, res) => {

    req.flash("success", "Welcome to Wonderlist! You're logged in!");  // Sets a success flash message
   let redirectUrl=  res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);  // Redirects the user to the /listings page on successful login
});


router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out!");
         res.redirect("/listings"); 
    })
})
 
module.exports=router;