var express = require('express');
var router = express.Router();
var User = require("../models/users.js");
var passport = require('passport');

// ==============================
// Auth Routes
// =============================

router.get("/register", function(req, res){
    res.render("users/new");
});

router.post("/register", function(req, res){
    req.body.username;
    req.body.password;

    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log("Cannot Sign Up");
            res.redirect("/register");
        }else{
          passport.authenticate("local")(req, res, function(){
            console.log("Secret");
            res.render("secret");
          });
        }

    });
});

router.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
})

router.get("/login", function(req, res){
    res.render("users/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect  : "/blogs",
    failureRedirect   :"/login"
}), function(req, res){

});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blogs");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
