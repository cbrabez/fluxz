const express = require('express');
var bodyParser = require("body-parser");
const Parser = require('rss-parser');
var path = require("path");
let parser = new Parser();
var methodOverride = require("method-override");
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const cron = require("node-cron");

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ROUTING
let router = express.Router();
var indexRoutes   = require("./routes/index"),
    feedRoutes    = require("./routes/feed");
app.use("/", indexRoutes);
app.use("/feed", feedRoutes);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

let rawfeeds = fs.readFileSync('feed-list.json');
feedlist = JSON.parse(rawfeeds);

FEED_CONTENT = [];
let currentFeed;

cron.schedule("* * * * *", function(){
  FEED_CONTENT = [];
  feedlist.forEach(function(feed){
  (async () => {
    try{currentFeed = await parser.parseURL(feed.url);
    }
    catch(e) {
      console.error(e.message); // "oh, no!"
    };
    console.log(currentFeed.title);
    FEED_CONTENT.push(currentFeed);
    })();
  });
    //return res.json(FEED_CONTENT);
    console.log(FEED_CONTENT);
  });

  module.exports = app;



app.listen(PORT, () => console.log(`Listening on ${PORT}`));