var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var models = require('../models/index');
var Page = models.Page;
var User = models.User;
var User_Pages = models.User_Pages;

router.get('/wiki/', function(req, res, next) {

    res.send('got to GET /wiki/');
});

function generateUrlTitle(title) {
    if (title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
        // Generates random 5 letter string
        return Math.random().toString(36).substring(2, 7);
    }
}

router.post('/wiki/', function(req, res, next) {
    // res.send(req.body);
    var page = Page.build({
        title: req.body.title,
        urlTitle: generateUrlTitle(req.body.title),
        content: req.body.content,
        status: req.body.status
    });

    var user = User.build({
        name: req.body.author,
        email: req.body.email,
    });




    page.save();
    user.save();
    console.log(page)
    res.redirect(page.urlTitle);
    // var user_id;
    // var page_id;

    // Page.includes

    // var foundPage = Page.findAll({
    //     where: page
    // }).then(function(thisPage) {
    //     page_id = thisPage.id;
    // });

    // var foundUser = User.findAll({
    //     where: user
    // }).then(function(thisUser) {
    //     user_id = thisUser.id;
    // });

    // Promise.all([foundPage, foundUser]).then(function() {
    //     console.log(user_id, page_id);
    // })

    //  var user_pages = User.build({


    // });

    // user_page.save();

});

router.get('/wiki/add/', function(req, res, next) {
    res.render('addpage');
});

router.get('/wiki/:urlTitle/', function(req, res, next) {
    var urlTitle = req.params.urlTitle;
    var pageResult = Page.findAll({
        where: {urlTitle : urlTitle }
    });

    pageResult.then(function(data){
    	// data[0].dataValues.route = data[0].dataValues.urlTitle.route(); 
    	console.log(data[0].dataValues);
    	res.render('wikipage' , data[0].dataValues);	
    })
    
    
});



module.exports = router;

// method	full path	router path	action
// GET	/wiki/	/	retrieve all wiki pages
// POST	/wiki/	/	submit a new page to the database
// GET	/wiki/add/	/add	retrieve the "add a page" form