var mongoose = require('mongoose');
var Blog = require('./models/blog');
var Comment = require('./models/comments.js');

var data = [
    {
        title : "First Blog",
        image : "https://i1.wp.com/www.silocreativo.com/en/wp-content/uploads/2015/10/analysis-new-google-logo-redesign.png?fit=666%2C370&quality=100&strip=all&ssl=1",
        body  : "Test"
    },
    {
        title : "Second Blog",
        image : "https://i1.wp.com/www.silocreativo.com/en/wp-content/uploads/2015/10/analysis-new-google-logo-redesign.png?fit=666%2C370&quality=100&strip=all&ssl=1",
        body  : "Test"
    },
    {
        title : "Third Blog",
        image : "https://i1.wp.com/www.silocreativo.com/en/wp-content/uploads/2015/10/analysis-new-google-logo-redesign.png?fit=666%2C370&quality=100&strip=all&ssl=1",
        body  : "Test"
    }
];

function seedDB(){
// Remove all Data
    Blog.remove({}, function(err){
        if(err){
          console.log("Error Removing Data");
        }else{
            console.log("Data Removed from the Database");
            data.forEach(function(seed){
                Blog.create(seed, function(err, savedData){
                    if(err){
                        console.log("Error Saving Data");
                    }else{
                        console.log("Data Saved Succesfully");
                        Comment.create({
                            message : "This blog is just Fantastic",
                            author  : "Tushar Swami"
                        }, function(err, savedComment){
                              if(err){
                                  console.log("Couldn't Save Comment");
                              }else{
                                  savedData.comments.push(savedComment);
                                  savedData.save();
                                  console.log("New Comment Created");
                              }
                        });
                    }
                });
            });
        }
    });//Remove End
}

module.exports = seedDB;
