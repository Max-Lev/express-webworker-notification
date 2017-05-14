var express = require('express');
var app = express();
var port = 8080;
var path = require('path');


//express uses 'use' as first:
//searches for static assets
app.use(express.static('public'));
app.use(express.static('src/views'));
app.set('views', './src/views');
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//setting view engine
//app.set('view engine', 'jade');
app.get('/', function (req, res) {
    res.send('app init');
});

app.post('/getBooks',function(req,res,next){

});

app.get('/getBooks', function (req, res, next) {

    var options = {
        root: __dirname + '/src/assets',
        headers: {
            amount: 60
        }
    };
    res.sendFile('booksList.json', options, function (err) {
        if (err) {
            console.log(err);
            next(err);
        }
        next();
    });
});

app.get('/second', function (req, res, next) {

    var options = {
        root: __dirname + '/src/views/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = "second.html";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('sent: second.html');
        }
    });

});

app.get('/books', function (req, res) {
    res.send('books');
});

app.listen(port, function (err) {
    console.log('running server on port: ', port);
});
