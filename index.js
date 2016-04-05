var express = require('express');
var bodyParser = require('body-parser')
var app = require('./client/app.js');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use("/client", express.static(__dirname + '/client'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('main');
});

app.post('/', function(req, res){
  // res.send("Hello")
  // var zip = req.body.zip;
  // var data;
  // app.get('//api.openweathermap.org/data/2.5/weather?q='+zip+'&units=imperial&APPID=5108ea3af1fe4418cd038843b7e3cf53', function(req, res){
  //     res.end(function(){
  //       data = res.body;
  //     })
  // })
  // res.end(data + "Hello!");

});

var port  = process.env.PORT|| 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});