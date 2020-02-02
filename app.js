//Import Packages
//https://github.com/tusharswami/BlogTemplate.git
var express          = require('express'),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    methodOverride   = require('method-override'),
    Blog             = require('./models/blog.js'),
    User             = require("./models/users.js")
    seedDB           = require('./seeds'),
    commentRoutes    = require("./routes/comments"),
    blogRoutes       = require("./routes/blogs"),
    authRoutes       = require("./routes/auth"),
    Comment          = require('./models/comments.js'),
    passport         = require('passport'),
    LocalStrategy    = require('passport-local'),
    passportLocalMongoose    = require('passport-local-mongoose'),
    app              = express();


seedDB();
//App Config
mongoose.connect("mongodb://localhost:27017/SoFuture");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(require('express-session')({
    secret  : "My name is Tushar Swami",
    resave  : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();

});

//RESTful Routes
app.use(commentRoutes);
app.use(blogRoutes);
app.use(authRoutes);

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
          return next();
    }
    res.redirect("/login");
}


app.listen(3000, function(){
  console.log("Server Started at Port: 8080 for Blog Site");
});
