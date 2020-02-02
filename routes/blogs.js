var express = require('express');
var router = express.Router();
var Blog = require("../models/blog");


router.get("/", function(req, res){
  res.redirect("/blogs");

});

router.get("/blogs", function(req, res){
  Blog.find({}, function(err, postRtvd){
    if(err){
      console.log("Error in fetching data from the Database");
    }
    else{
      res.render("index",{blogs  :  postRtvd});
    }
  });
});

router.get("/blogs/new", function(req, res){
  res.render("blogs/new");
});

router.post("/blogs", function(req,res){
  Blog.create(req.body.blog, function(err, postSaved){
    if(err){
      console.log("Can't Save your Blog");
    }else{
      console.log("Data Succesfully Saved");
      console.log(postSaved);
      res.redirect("/blogs")
    }
  });
});

router.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id).populate("comments").exec(function(err, foundPost){
    if(err){
      console.log("Requested Post is no more available");
    }else{
      console.log(foundPost);
      res.render("blogs/show", {blog: foundPost});
    };
  });
});

router.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      console.log("Cannot Edit the Blog");
    }else{
      res.render("blogs/edit", {blog : blog});
    }
  });
});

router.put("/blogs/:id", function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, postUpdated){
    if(err){
      console.log("Post can't be updated");
    }else{
      res.redirect("/blogs");
    }
  });
});

router.delete("/blogs/:id", function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err, postRemoved){
    if(err){
      console.log("Post cannot be deleted");
    }else{
      res.redirect("/blogs");
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
