
const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const ExpressError=require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");



module.exports.isLoggedIn=(req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged into create listing!");
         return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if( req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate("owner");
    
    // Check if listing exists
    if(!listing){
        req.flash("errors","Listing not found!");
        return res.redirect("/listings");
    }
    
    // Check if listing has an owner (handle orphaned listings)
    if(!listing.owner){
        req.flash("errors","This listing has no owner. Contact administrator.");
        return res.redirect("/listings");
    }
    
    // Check if user is logged in (currUser should exist)
    if(!res.locals.currUser){
        req.flash("errors","You must be logged in!");
        return res.redirect("/login");
    }
    
    // Compare owner ID with current user ID
    if(!listing.owner._id.equals(res.locals.currUser._id)){
       req.flash("errors","You are not the owner of this listing!");
      return res.redirect(`/listings/${id}`);
    }
     next();
};
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
  
   if (error) {
    let errMsg=error.details.map((el)=>el.message).join(",");
         throw new ExpressError(400,errMsg);
     }else{
        next();
     }
};


module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
  
   if (error) {
    let errMsg=error.details.map((el)=>el.message).join(",");
         throw new ExpressError(400,errMsg);
     }else{
        next();
     }
};



module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  // Find the review inside DB
  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  // Check user login
  if (!req.user) {
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }

  // Check if logged-in user is the review author
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
