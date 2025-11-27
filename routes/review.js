   const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isOwner,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");
const review = require("../models/review.js");

//reviews= post route
router.post("/",validateReview,isLoggedIn,isOwner,wrapAsync(reviewController.createReview ));
// delete review route
router.delete("/:reviewId",validateReview,isLoggedIn,isOwner,isReviewAuthor, wrapAsync(reviewController.deleteReview ));

module.exports=router;