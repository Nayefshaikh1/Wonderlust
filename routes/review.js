const express=require("express");
const router=express.Router({mergeParams:true});
const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const {reviewSchema}=require("../schema.js");


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
  
   if (error) {
    let errMsg=error.details.map((el)=>el.message).join(",");
         throw new ExpressError(400,errMsg);
     }else{
        next();
     }
};

//reviews= post route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
  
    const listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","new review created!");


    res.redirect(`/listings/${listing._id}`);

}));
// delete review route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    // Update the listing to remove the review reference
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review itself
    await Review.findByIdAndDelete(reviewId);

    req.flash("success"," Review deleted!");


    // Redirect back to the listing page
    res.redirect(`/listings/${id}`);
}));

module.exports=router;