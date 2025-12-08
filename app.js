if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listingRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/review.js");
const session = require('express-session');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const UserRoute=require("./routes/user.js");
const User=require("./models/user.js");



const MONGO_URL='mongodb://127.0.0.1:27017/wonderlist';
main().then(()=>{
    console.log("conected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});



const sessionOption={
    
        secret:"mysupersecretstring",
        resave: false,
        saveUninitialized: true,
        cookie:{
            expires:Date.now()+7*60*60*1000,
            httpOnly:true,
        },
};

app.use(session(sessionOption));
 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.errors=req.flash("errors");
    res.locals.currUser=req.user;
    next();
})

app.use("/listings",listingRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/",UserRoute);






//     app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new  villa",
//         description:"by the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"india",
//     });await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
   let{status=500,message="Something went wrong"}=err;
   res.status(status).render("error.ejs",{message});
   //res.status(status).send(message);
});


app.listen(8080,()=>{
    console.log("server is listing to port 8080");
});