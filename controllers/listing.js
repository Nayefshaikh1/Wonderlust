const Listing = require("../models/listing");
const User = require("../models/user");
const fetch = require("node-fetch");

module.exports.index =async (req,res)=>{
    const { q, category } = req.query;
    let filter = {};
    if (q) filter.$or = [
        { location: { $regex: q, $options: "i" } },
        { title:    { $regex: q, $options: "i" } },
        { country:  { $regex: q, $options: "i" } },
    ];
    if (category && category !== "Trending") filter.category = category;
    
    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, currentCategory: category || "Trending" });
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("errors", "Listing doesn't exist!");
        return res.redirect("/listings");
    }

    // Server-side geocoding with Nominatim
    let mapCoords = null;
    try {
        const query = encodeURIComponent(`${listing.location}, ${listing.country}`);
        const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
            { headers: { "User-Agent": "Wonderlust-App/1.0" } }
        );
        const geoData = await geoRes.json();
        if (geoData && geoData.length > 0) {
            mapCoords = { lat: parseFloat(geoData[0].lat), lng: parseFloat(geoData[0].lon) };
        }
    } catch (e) {
        console.log("Geocoding failed:", e.message);
    }

    res.render("listings/show.ejs", { listing, mapCoords });
};

 module.exports.createListing=async(req,res,next)=>{
       let url = req.file ? req.file.path : "";
       let filename = req.file ? req.file.filename : "";
       const newlisting= new Listing(req.body.listing);
       if(req.file) {
           newlisting.image = { url, filename };
       }
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
         let listingData = req.body.listing;
         if(req.file) {
             let url = req.file.path;
             let filename = req.file.filename;
             listingData.image = { url, filename };
         }
         await Listing.findByIdAndUpdate(id,{...listingData});
          req.flash("success","listing updated!");
          res.redirect(`/listings/${id}` );
     
     };

    module.exports.deleteListing=async(req,res)=>{
     let {id}=req.params;
     let deletedlisting=await Listing.findByIdAndDelete(id);
    req.flash("success","listing deleted successfully!");
      res.redirect("/listings");
     };
