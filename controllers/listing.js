const Listing = require("../models/listing");

module.exports.index =async (req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.showListing =async(req,res)=>{
     let {id}=req.params;
     const listing=await Listing.findById(id).populate("reviews").populate("owner").populate({path:"reviews", populate:{path:"author"}});
     if(!listing){
        req.flash("errors"," Listing doesn`t exist!");
        res.redirect("/listings");
     }
     res.render("listings/show.ejs",{listing});
 
 };

 module.exports.createListing=async(req,res,next)=>{
       const newlisting= new Listing(req.body.listing);
       newlisting.owner=req.user._id;
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
 };

 module.exports.editListing= async(req,res)=>{
      let {id}=req.params;
      const listing=await Listing.findById(id);
      if(!listing){
         req.flash("errors"," Listing doesn`t exist!");
         res.redirect("/listings");
      } 
      
        res.render("listings/edit.ejs",{listing});
  
    };

    module.exports.updateListing=async(req,res)=>{
         let {id}=req.params;
         await Listing.findByIdAndUpdate(id,{...req.body.listing});
          req.flash("success","listing updated!");
          res.redirect(`/listings/${id}` );
     
     };

    module.exports.deleteListing=async(req,res)=>{
     let {id}=req.params;
     let deletedlisting=await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted successfully!");
      res.redirect("/listings");
     };
