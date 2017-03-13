var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var models = require('../models/index');
var Page = models.Page;
var User = models.User;
var User_Pages = models.User_Pages;
var Promise = require('bluebird');

router.get('/wiki/', function(req, res, next) {

    res.send('got to GET /wiki/');
});



router.post('/wiki/', function(req, res, next) {
    // res.send(req.body);

    User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    })
    .then(function (values) {

      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
      });

      return page.save().then(function (page) {
         return page.setAuthor(user);
      });

    })
    .then(function (page) {
      // console.log(page.route);
      res.redirect(page.route);
    })
    .catch(next);

});

router.get('/wiki/add/', function(req, res, next) {
    res.render('addpage');
});

router.get('/wiki/user/:userId', function(req, res, next) {

  var userPromise = User.findById(req.params.userId);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(values) {
  	console.log(values[1][0]);
    var user = values[0];
    var pages = values[1][0];
    // console.log(pages);
    res.render('user', { user: user, pages: pages });
  })
  .catch(next);

});


router.get('/wiki/:url', function(req, res, next){
	// console.log(req.params.url);

	var pagesPromise = Page.findOne({
    	where: {
    	  urlTitle: req.params.url
    	},
    	include: [
      		{model: User, as: 'author'}
  		]
  	}).then(function(data){
  		console.log(data);
  		res.render('wikipage', {content : data});
  	})

  
});

router.get('/wiki/edit/', function(req, res, next) {
    // res.render('addpage');
});

router.get('/wiki/delete/', function(req, res, next) {
    // res.render('addpage');
});



router.get('/wiki/:urlTitle', function(req, res, next) {
  Page.findOne({
  where: {
      urlTitle: req.params.urlTitle
  },
  include: [
      {model: User, as: 'author'}
  ]
})
.then(function (page) {
  // page instance will have a .author property
  // as a filled in user object ({ name, email })
  // Object.assign({}, page.dataValues);
  // Object.assign({})

  var fields = {
    id: page.dataValues.id,
    title: page.dataValues.title,
    content: page.dataValues.content,
    status: page.dataValues.status,
    author: page.dataValues.author.dataValues.name,
    authorId: page.dataValues.author.dataValues.id,
    email: page.dataValues.author.dataValues.email
  }


  if (page === null) {
      res.status(404).send();
  } else {
      res.render('wikipage', fields);
  }
})
.catch(next);

});



module.exports = router;

// method	full path	router path	action
// GET	/wiki/	/	retrieve all wiki pages
// POST	/wiki/	/	submit a new page to the database
// GET	/wiki/add/	/add	retrieve the "add a page" form
