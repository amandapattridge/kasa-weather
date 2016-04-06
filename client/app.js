// var $ = require("jquery");

var weatherFuncs = {
  getWeather: function(loc, cb){
        $.getJSON('//api.openweathermap.org/data/2.5/weather?q='+loc+'&units=imperial&APPID=5108ea3af1fe4418cd038843b7e3cf53').then(function(results){
      // console.log(results);
      console.log(results);
      if(cb){
        cb(results);
      }
    });
  },
      
  getWeatherOnClick : function(){
  	return $('button').on('click', function(e){
    var location = $('#zip').val();
      getWeather(location, function(data){
        console.log(data);
        $('#results').empty();
        $('#results').append('<h4>'+data.name+'</h4>');
        $('#results').append('<div id="condition"><h5>'+data.weather[0].description+'</h5></div>');
        $('#results').append('<div id="temp"> Temp: '+data.main.temp+' F</div>');
        $('#results').append('<div id="wind"> Wind: '+data.wind.speed+' mph</div>');
        $('#results').append('<div id="humidity"> Humidity: '+data.main.humidity+'%</div>');
      });
    });
  }
};

// module.exports = weatherFuncs