const Listing=require("../models/listing.js");
const User=require("../models/user.js");

module.exports.renderSignup=async(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup=async(req,res)=>{
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
    
};


module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=(req, res) => {

    req.flash("success", "Welcome to Wonderlist! You're logged in!");  // Sets a success flash message
   let redirectUrl=  res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);  // Redirects the user to the /listings page on successful login
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out!");
         res.redirect("/listings"); 
    })
};