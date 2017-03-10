var express = require('express');
var router = express.Router();

router.get('/wiki/', function(req, res, next){
  res.send('got to GET /wiki/');
});

router.post('/wiki/', function(req, res, next){
  res.send('got to POST /wiki/')
};)

router.get('/wiki/add/', function(req, res, next){
  res.send('got to GET /wiki/add');
});

module.exports = router;

// method	full path	router path	action
// GET	/wiki/	/	retrieve all wiki pages
// POST	/wiki/	/	submit a new page to the database
// GET	/wiki/add/	/add	retrieve the "add a page" form
