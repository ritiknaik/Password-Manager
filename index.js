
var express = require("express");
var app = express();
var passport = require("passport");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth",{useNewUrlParser: true, useUnifiedTopology: true});
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
const path = require('path');
var User = require("./modules/user");
app.set("view engine","ejs");
app.use(require("express-session")({
    secret:"i am happy",
    resave:false,
    saveUninitialized:false
}));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//routes
app.use(express.static(path.join(__dirname, 'public')))
app.get("/",function(req,res){
    res.render("index");
})
app.get("/Mainpage",isLoggedIn,function(req,res){
    res.render("Mainpage");
})
app.get("/SignUp",function(req,res){
    res.render("SignUp");
});
app.post("/Mainpage",function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);

    console.log("Sign Up completed");
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log("error");
            console.log(err);
            return res.render('SignUp');
        }
        console.log("alive");
            passport.authenticate("local")(req,res,function(){
                res.redirect("/Mainpage");
            })
    })

})
app.get("/Login",function(req,res){
    res.render("Login");
});
app.post("/Login",passport.authenticate("local",{
    successRedirect:"/Mainpage",
    failureRedirect:"/SignUp",
    }),function(err , user){
//    console.log(req.body.password),
        
    
});

app.get("/Addpassword",function(req,res){
    res.render("Addpassword");
})


app.get("/Updatepassword",function(req,res){
    res.render("Updatepassword")
})

//LISTNER
app.listen(3000,function(){
    console.log("Server online");
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/Login");
}
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})