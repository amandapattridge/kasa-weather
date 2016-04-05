var express = require('express');
var app = require('./client/app.js');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('main');
});

app.post('/', function(req, res){
  console.log('post request made')
});

var port  = process.env.PORT|| 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});