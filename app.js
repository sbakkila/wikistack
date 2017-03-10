var express = require('express')
var app = express();
var pg = require('pg');
var models = require('./models');
var nunjucks = require('nunjucks');
// var morgan = require('morgan');

var client = new pg.Client('postgres://localhost:5432/wikistack');

client.connect();

// app.use(morgan('dev'));

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off


models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

var wikiRouter = require('./routes/index.js');

app.use('/wiki', wikiRouter);


module.exports = client;
