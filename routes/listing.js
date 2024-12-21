const express=require("express");
const router=express();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const {reviewSchema}=require("../schema.js");
const {isLoggedIn}=require("../middleware.js");


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
  
   if (error) {
    let errMsg=error.details.map((el)=>el.message).join(",");
         throw new ExpressError(400,errMsg);
     }else{
        next();
     }
};

//index route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
     
 }));
 //new route
 router.get("/new",isLoggedIn,(req,res)=>{
    
     res.render("listings/new.ejs");
 });
 //show route
 router.get("/:id",wrapAsync(async(req,res)=>{
     let {id}=req.params;
     const listing=await Listing.findById(id).populate("reviews");
     if(!listing){
        req.flash("errors"," Listing doesn`t exist!");
        res.redirect("/listings");
     }
     res.render("listings/show.ejs",{listing});
 
 }));
 //create route
 router.post("/",validateListing,isLoggedIn,
 wrapAsync(async(req,res,next)=>{
       const newlisting= new Listing(req.body.listing);
    await newlisting.save();
    req.flash("success","new listing created!");
    res.redirect("/listings");
     //let {title,description,image,price,loction,country}=req.body;
     // 
     // if(!newlisting.title){
     //     throw new ExpressError(400,"Title is missing!");
     // }
     // if(!newlisting.description){
     //     throw new ExpressError(400,"Description is missing!");
     // }
     // if(!newlisting.location){
     //     throw new ExpressError(400,"Location is missing!");
     // }
 }));
 
 //edit route
 router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
     let {id}=req.params;
     const listing=await Listing.findById(id);
     if(!listing){
        req.flash("errors"," Listing doesn`t exist!");
        res.redirect("/listings");
     } 
       res.render("listings/edit.ejs",{listing});
 
 }));
 //update route
 router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
     let {id}=req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing updated!");

      res.redirect(`/listings/${id}` );
 
 }));
 //delete route
 router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
     let {id}=req.params;
     let deletedlisting=await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted successfully!");
      res.redirect("/listings");
     })
 );

 module.exports=router;