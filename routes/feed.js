require('../app.js');
const express = require('express');
let app = express();
let router = express.Router();

router.get('/', function(req, res){
    
    res.render('feeds', {content : FEED_CONTENT});

})

module.exports = router;