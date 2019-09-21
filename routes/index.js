require('../app.js');
const express = require('express');
let app = express();
let router = express.Router();

router.get('/', function(req, res){
    res.send("THIS IS THE INDEX ROUTE!!!!");
})

module.exports = router;