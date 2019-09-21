const express = require('express');
const Parser = require('rss-parser');
var path = require("path");
let parser = new Parser();
var methodOverride = require("method-override");
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const cron = require("node-cron");

let app = express();

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

const FEED_LIST = [
  'https://css-tricks.com/feed/',
  //'https://codepen.io/posts/feed',
  'https://blog.safia.rocks/rss',
  'https://hnrss.org/frontpage',
  'https://tj.ie/feed.rss'
];

FEED_CONTENT = [];
let currentFeed;

cron.schedule("* * * * *", function(){
  FEED_CONTENT = [];
  FEED_LIST.forEach(function(feed){
  (async () => {
    try{currentFeed = await parser.parseURL(feed);
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

  module.exports = app, FEED_CONTENT;



app.listen(PORT, () => console.log(`Listening on ${PORT}`));