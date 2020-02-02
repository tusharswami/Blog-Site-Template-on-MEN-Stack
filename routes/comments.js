var express = require('express');
var router = express.Router();
var Blog = require("../models/blog");
var Comment = require("../models/comments.js");


router.get("/blogs/:id/comments/new",isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, foundPost){
      res.render("comments/new", {blog :foundPost});
    });
});

router.post("/blogs/:id/comments",isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log("Post not found");
        }else{
            Comment.create(req.body.comments, function(err, commentSaved){
                if(err){
                    console.log("Comment can't be saved");
                }else{
                    console.log("Comment Saved successfully");
                    foundPost.comments.push(commentSaved);
                    foundPost.save();
                    res.redirect("/blogs/"+ foundPost._id);

                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
          return next();
    }
    res.redirect("/login");
}


module.exports = router;
