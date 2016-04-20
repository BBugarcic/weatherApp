$("document").ready(function() {

  var lat;
  var lon;
  var key = "c92e0de77589138b9c3b57072016d222";
  var dateObj;
  var dateCurrent;
  var dayForecast;
  var forecastInfos;
  var currentInfos;
  var tmp;
  
  /**
    * Format data (e.g. Friday 13 April 2016). This function is executed as part of function displayDate.
    * It takad global variable dateObj as parameter.
    *
    **/  
  function formatDate(dateObj) {
    var year = dateObj.getFullYear();
    var months = ["Jan", "Feb", "Mart", "Apr", "Jun", "Jul", "Avg", "Sept", "Okt", "Nov", "Dec"];
    var month = months[dateObj.getMonth()];
    var date = dateObj.getDate();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[dateObj.getDay()];
    dayForecast = day;
    dateCurrent = day + " " + date + " " + month + " " + year;
  }

  /**
    * This fuction is executed as part of function displayForcast. It takes a date parameter from 
    * JSON string that is returned from 7 days forecast API. In case of current date, there is
    * no such parameter and it creates new Date object. Date object is stored in global variable
    * dateObj and passed to function formatDate.
    * 
    * */ 
  function displayDate(dt) {
    if (arguments.length === 0) {
      dateObj = new Date();
      formatDate(dateObj);
      $(".date").html(dateCurrent);
    } else {
      dateObj = new Date(dt * 1000);
      formatDate(dateObj);
    }

  }

  /**
    * This function takes JSON string from API and passes current weather data to HTML elements. 
    * Change a background picture to suit weather conditions.
    *
    **/
  function displayCurrentWeather(jsonString) {
    console.log(JSON.stringify(jsonString), null, 4);
    $(".location").html(jsonString.name + ", " + jsonString.sys.country);
    tmp = Math.round(jsonString.main.temp);
    $("#temp-current").html(tmp + "°C");
    var icon = jsonString.weather[0].icon;
    var srcURL = "http://openweathermap.org/img/w/" + icon + ".png";
    $("#current-icon").attr("src", srcURL);

    switch (icon) {
      case "01d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1459861048/clearsky_oetxhq.jpg')");
        $("#current-weather").css("opacity", "0.5");
        $("#forecast-wrapper").css("background-color", "rgb(101,157, 240)");
        break;
      case "01n":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563176/clearSkyNight_d2fay4.jpg')");
        $("#current-weather").css("opacity", "0.4");
        $("#forecast-wrapper").css("background-color", "rgb(129,130, 132)");
        break;
      case "02d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563135/scatteredClouds_cbiyau.jpg')");
        $("#current-weather").css("opacity", "0.5");
        $("#forecast-wrapper").css("background-color", "rgb(41, 101, 161)");
        break;
      case "02n":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460621051/fewCloudsNight_jh0a2u.jpg')");
        $("#forecast-wrapper").css("background-color", "rgb(12, 16, 28)");
        break;
      case "03d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563135/scatteredClouds_cbiyau.jpg')");
        $("#current-weather").css("opacity", "0.5");
        $("#forecast-wrapper").css("background-color", "rgb(41, 101, 161)");
        break;
      case "03n":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460621273/scatteredCloudsNight_vfefku.jpg')");
        $("#forecast-wrapper").css("background-color", "rgb(0, 0, 0)");
        break;
      case "04d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563397/brokenCloudsDay_rcpgpc.jpg')");
        $("#forecast-wrapper").css("background-color", "rgb(75, 107, 162)");
        break;
      case "04n":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563575/nightClouds_qxkttx.jpg')");
        $("#current-weather").css("opacity", "0.5");
        $("#forecast-wrapper").css("background-color", "rgb(24, 18, 22)");
        break;
      case "09d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460620581/rainDay_dhlzzs.jpg')");
        $("#current-weather").css("opacity", "0.6");
        $("#forecast-wrapper").css("background-color", "rgb(125, 111, 64)");  
        break;
      case "09n":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563100/rainNight_nmvcod.jpg')");
        $("#current-weather").css("opacity", "0.7");
        $("#forecast-wrapper").css("background-color", "rgb(51, 68, 96)");   
        break;
      case "10d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460620581/rainDay_dhlzzs.jpg')");
        $("#current-weather").css("opacity", "0.6");
        $("#forecast-wrapper").css("background-color", "rgb(125, 111, 64)");  
        break;
      case "10n":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563100/rainNight_nmvcod.jpg')");
        $("#current-weather").css("opacity", "0.7");
        $("#forecast-wrapper").css("background-color", "rgb(51, 68, 96)");   
        break;
      case "11d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563447/rainDayStorm_fsmkwk.jpg')");
        $("#forecast-wrapper").css("background-color", "rgb(66, 77, 95)");  
        break;
      case "11n":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460621748/thunderstormNight_dogb3l.jpg')");
        $("#forecast-wrapper").css("background-color", "rgb(52, 50, 55)");
        break;
      case "13d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563121/snowDay_bhkhmv.jpg')");
        $("#sidePanel").css("opacity", "0.8");
        $("#current-weather").css("opacity", "0.7");
        $("#forecast-wrapper").css("background-color", "rgb(254, 254, 254)");   
        break;
      case "13d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460632222/nightSnow_jjslba.jpg')");
        $("#current-weather").css("opacity", "0.5");
        $("#forecast-wrapper").css("background-color", "rgb(24, 48, 75)");
        break;
      case "50d":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563296/mist_cf7ta6.jpg')"); 
        $("#forecast-wrapper").css("background-color", "rgb(138, 138, 138)");   
        break;
      case "50n":
        $(".cover").css("background-image", "url('http://res.cloudinary.com/dnkyfvpgn/image/upload/v1460563296/mist_cf7ta6.jpg')"); 
        $("#forecast-wrapper").css("background-color", "rgb(138, 138, 138)");  
        break;
    }

  }
  
  /**
    * This function passes 7 days forecast to HTML elements. It takes JSON from API and displays days, 
    * weather icon and min and max temperature.
    *
    **/
  
  function displayForecast(jsonString) {
    console.log("forecast: " + jsonString);
    console.log(JSON.stringify(jsonString), null, 4);

    for (var i = 1; i <= 7; i++) {

      var iconId = "#icon" + i;
      var srcURL = "http://openweathermap.org/img/w/" + jsonString.list[i].weather[0].icon + ".png";
      $(iconId).attr("src", srcURL);

      var dt = jsonString.list[i].dt;
      displayDate(dt);
      var dateId = "#date" + i;
      $(dateId).html(dayForecast);

      var minTemp = Math.round(jsonString.list[i].temp.min);
      var minTempId = "#min-temp" + i;
      $(minTempId).html(minTemp);

      var maxTemp = Math.round(jsonString.list[i].temp.max);
      var maxTempId = "#max-temp" + i;
      $(maxTempId).html(maxTemp);

    }
  }
  
  // get json
  function getCurrentWeather() {
    $.ajax({
          url: "http://api.openweathermap.org/data/2.5/weather",
          type: "GET",
          dataType: "json",
          data: {
            lat: lat,
            lon: lon,
            APPID: key,
            units: "metric"
          },
          success: function(jsonString) {
            currentInfos = jsonString;
            displayDate();
            displayCurrentWeather(currentInfos); 
          },
          error: function(xhr,ajaxOptions,thrownError) {
				    alert(thrownError);
			    }
        });
  }
  
  // get json
  function getForecast() {
    $.ajax({
          url: "http://api.openweathermap.org/data/2.5/forecast/daily",
          type: "GET",
          dataType: "json",
          data: {
            lat: lat,
            lon: lon,
            APPID: key,
            units: "metric",
            cnt: 8
          },
          success: function(jsonString) {
            forecastInfos = jsonString;
            displayForecast(jsonString);           
          },
          error: function(xhr,ajaxOptions,thrownError) {
				    alert(thrownError);
			    }
    
        });
  }

  // asks for a location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getCurrentWeather();
      getForecast();
    });
  }
  
  // handle click link
  // trigger a panel with more details about current weather (from left side)
  $("#see-more").on("click", function() {
    var trigerId = this.id;

    if (trigerId === "see-more") {
      console.log("currentInfos: " + JSON.stringify(currentInfos), null, 4);
      tmp = Math.round(currentInfos.main.temp);
      $("#info-temp").html(tmp + "°C");

      var dt = currentInfos.dt;
      displayDate(dt);
      var dateId = "#info-date";
      $(dateId).html(dateCurrent);

      $("#info-place").html(currentInfos.name + ", " + currentInfos.sys.country);
      $("#info-pressure").html(currentInfos.main.pressure + "hPa");
      $("#info-humidity").html(currentInfos.main.humidity + "%");
      $("#info-wind").html(currentInfos.wind.speed + "m/s");

    }

    $("#current-weather").toggle("slow");
    $(".panel").removeClass("hidden slideOutLeft").addClass("slideInLeft");
  });
  
  // handle click on buttons
  // convert celsius to farenheit
  $("#fahrenheit").on("click", function() {
    var tmpFahrenheit = Math.round(tmp * 1.8 + 32) + "°F";
    console.log("f: " + tmpFahrenheit);
    $("#info-temp").html(tmpFahrenheit);
    $("#fahrenheit").addClass("active disable-select");
    $("#celsius").removeClass("active disable-select");
  });

  // convert fahrenheit to celsius
  $("#celsius").on("click", function() {
    var tmpCelsius = tmp + "°C"
    $("#info-temp").html(tmpCelsius);
    $("#celsius").addClass("active disable-select");
    $("#fahrenheit").removeClass("active disable-select");
  });
  
  // close side panel with additional information
  $("#close-panel").on("click", function() {
    $(".panel").removeClass("slideInLeft").addClass("slideOutLeft");
    $("#current-weather").toggle("slow");
  });
  
  // scroll to 7 days forecast
  $(".get-forecast").on("click", function() {
    $("html, body").animate({
        scrollTop: $("#forecast").offset().top      
    }, 1000);
  });
  
  // scroll back to inforamtions about current weather
  $("#back-to-current").on("click", function() {
    $("html, body").animate({
        scrollTop: $(".box-wrapper").offset().top      
    }, 1000);
    
    // close side panel if it is open
    if($(".panel").hasClass("slideInLeft")) { 
          $(".panel").removeClass("slideInLeft").addClass("slideOutLeft");
          $("#current-weather").toggle("slow");
    }
  });
});