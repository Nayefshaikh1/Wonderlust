const express=require("express");
const router=express();
const Listing=require("../models/listing.js");
const  index=require("../controllers/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");

const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listing.js");

router.route("/")
.get(wrapAsync(listingController.index))
.post(validateListing,isLoggedIn,
 wrapAsync(listingController.createListing));

 //new route
 router.get("/new",isLoggedIn,listingController.renderNewForm);

 router.route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(isLoggedIn,wrapAsync(isOwner),validateListing,wrapAsync(listingController.updateListing))
 .delete(isLoggedIn,wrapAsync(isOwner),wrapAsync(listingController.deleteListing));

 

 
 //edit route
 router.get("/:id/edit",isLoggedIn,wrapAsync(isOwner),wrapAsync(listingController.editListing));
 

 

 module.exports=router;