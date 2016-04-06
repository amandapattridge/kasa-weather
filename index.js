var express = require('express');
var bodyParser = require('body-parser');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
// var jsdom = require('jsdom')
var unirest = require('unirest');
var weatherFuncs = require('./client/app.js');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use("/client", express.static(__dirname + '/client'));
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('main');
});

var getWeatherData = function(zip, cb){
  unirest.get('http://api.openweathermap.org/data/2.5/weather?q='+zip+'&units=imperial&APPID=5108ea3af1fe4418cd038843b7e3cf53').end(function(response){
      cb(response.body)
      console.log(response.body);
  })
}

var addWeatherDataToPage = function(data){
  $('#results').empty();
  $('#results').append('<h4>'+data.name+'</h4>');
  $('#results').append('<div id="condition"><h5>'+data.weather[0].description+'</h5></div>');
  $('#results').append('<div id="temp"> Temp: '+data.main.temp+' F</div>');
  $('#results').append('<div id="wind"> Wind: '+data.wind.speed+' mph</div>');
  $('#results').append('<div id="humidity"> Humidity: '+data.main.humidity+'%</div>');
};

app.post('/', function(req, res){
  var zip = req.body.zip;
  console.log('zip', zip);

  // res.end(weatherFuncs.getWeather());
  unirest.get('http://api.openweathermap.org/data/2.5/weather?q='+zip+'&units=imperial&APPID=5108ea3af1fe4418cd038843b7e3cf53').end(function(response){
      var place = response.body.name;
      var temp = response.body.main.temp;
      var humidity = response.body.main.humidity;
      var wind = response.body.wind.speed;
      var description = response.body.weather[0].description
      res.render('results.ejs', {'place': place, 'wind': wind, 'humidity': humidity, 'temp': temp, 'description': description});
  });
});

var port  = process.env.PORT|| 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});