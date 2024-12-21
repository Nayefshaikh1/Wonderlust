const express=require("express");
const app=express();
const session = require('express-session');
const flash=require("connect-flash");
const path=require("path");
const { error } = require("console");

app.use(session({
    secret:"mysupersecretstring",
    resave: false,
    saveUninitialized: true,

}));
app.use(flash());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/register",(req,res)=>{
    let {name ="anonymous"}=req.query;
    req.session.name=name;
    if (name==="anonymous") {
        req.flash("error","user  register failed");
    }else{
         req.flash("success","user register successfully");
    }
   
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    res.locals.successmsg=req.flash("success");
    res.locals.failmsg=req.flash("error");
    res.render("page.ejs", {name:req.session.name});
})


// app.get("/recount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
    
//     res.send(` you sent a request ${req.session.count} time`);
// });

// app.get("/test",(req,res)=>{
//     res.send("test successful");
// });


app.listen(3000,()=>{
    console.log("server is listing at port 3000");
});