require('../app.js');
const express = require('express');
const fs = require("fs");
let app = express();
let router = express.Router();



router.get('/', function(req, res){
    res.render('feeds', {content : FEED_CONTENT, feedlist : feedlist});
})

router.post('/',function(req,res){
    //var feedUrl = req.body.feedUrl;
    //console.log(feedUrl);

    let newfeed = { 
        title: "dummy title",
        url: req.body.feedUrl
    };
     
    //let data = JSON.stringify(newfeed);
    feedlist.push(newfeed);
    fs.writeFileSync('feed-list.json', JSON.stringify(feedlist));
});

module.exports = router;