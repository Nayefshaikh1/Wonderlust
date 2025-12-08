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
const MongoStore = require('connect-mongo')
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const UserRoute=require("./routes/user.js");
const User=require("./models/user.js");





const MONGO_URL=process.env.ATLASDB_URL ;

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

let MongoStoreMod = MongoStore && MongoStore.default ? MongoStore.default : MongoStore;

const mongoUrl = MONGO_URL || process.env.MONGODB ;

let store;
try {
  // Preferred: use .create() if available (modern API)
  if (MongoStoreMod && typeof MongoStoreMod.create === 'function') {
    store = MongoStoreMod.create({
      mongoUrl,
      crypto: { secret: process.env.SESSION_SECRET || process.env.SECRET },
      touchAfter: 24 * 3600
    });
  } else if (typeof MongoStoreMod === 'function') {
    // Some distributions export the store class/constructor directly
    store = new MongoStoreMod({
      mongoUrl,
      crypto: { secret: process.env.SESSION_SECRET || process.env.SECRET },
      touchAfter: 24 * 3600
    });
  } else if (MongoStore && typeof MongoStore.MongoStore === 'function') {
    // fallback: named MongoStore property
    const Alt = MongoStore.MongoStore;
    store = new Alt({
      mongoUrl,
      crypto: { secret: process.env.SESSION_SECRET || process.env.SECRET },
      touchAfter: 24 * 3600
    });
  } else {
    throw new Error('Unsupported connect-mongo export shape');
  }
} catch (err) {
  console.error('Failed to create MongoStore:', err);
  throw err; // stop startup so you can see and fix the issue
}

// Optional: reuse mongoose's underlying MongoClient (recommended if using mongoose)
// Uncomment and use this instead of mongoUrl if you prefer to reuse the connection:
/*
const client = mongoose.connection.getClient && mongoose.connection.getClient();
if (client && MongoStoreMod && typeof MongoStoreMod.create === 'function') {
  store = MongoStoreMod.create({
    client,
    crypto: { secret: process.env.SESSION_SECRET || 'mysupersecretstring' },
    touchAfter: 24 * 3600
  });
}
*/

store.on('error', (e) => {
  console.error('Session store error:', e);
});

const sessionOption = {
  store,
  secret: process.env.SESSION_SECRET || 'mysupersecretstring',
  resave: false,
  saveUninitialized: false, // usually false for production
  cookie: {
    // use maxAge (milliseconds). 14 days example: 14 * 24 * 60 * 60 * 1000
    maxAge: 7 * 60 * 60 * 1000, // 7 hours (your original intent)
    httpOnly: true
  }
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
