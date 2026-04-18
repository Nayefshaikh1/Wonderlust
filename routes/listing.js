const express=require("express");
const router=express();
const Listing=require("../models/listing.js");
const  index=require("../controllers/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'public/uploads/') },
    filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname) }
});
const upload = multer({ storage: storage });
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listing.js");


//index route
router.get("/",wrapAsync(listingController.index));
 //new route
 router.get("/new",isLoggedIn,(listingController.renderNewForm));
 //show route
 router.get("/:id",wrapAsync(listingController.showListing));
 //create route
 router.post("/",isLoggedIn,upload.single("listing[image]"),validateListing,
 wrapAsync(listingController.createListing));
 
 //edit route
 router.get("/:id/edit",isLoggedIn,wrapAsync(isOwner),wrapAsync(listingController.editListing));
 //update route
 router.put("/:id",
    isLoggedIn,
    wrapAsync(isOwner),
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing));
 //delete route
 router.delete("/:id",isLoggedIn,wrapAsync(isOwner),wrapAsync(listingController.deleteListing));

 module.exports=router;