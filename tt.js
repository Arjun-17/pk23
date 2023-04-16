const clientId = 'OZATO4USDMG5ZYJMKY54YTK4Y2TPDWK34PSUG3GIV0RULAXP';
const clientSecret = 'OSXQJ50AFX20J2HNOHKFGPWKVVNYNSP13IOGOB5YETXLPLR4';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '7d20a5895a38a13dcdbb647529a3d4ca';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
//5 day forecast
const openWeatherKey1 = '8c8a69668bf6a4341f61a3bf5e833bbd';
const weatherUrl1 = 'https://api.openweathermap.org/data/2.5/forecast';
//background
const weatherUrl2='http://api.openweathermap.org/data/2.5/air_pollution/forecast'
// Page Elements
const $input = $('#city'); 
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [ $('#venue1'), $('#venue2'), $('#venue3'), $('#venue4'),$('#venue5'),$('#venue6'),$('#venue7'),$('#venue8')];
const $weatherDiv = $('#weather1');
const $weatherDiv1= $('#weather2');
const $weatherDiv2= $('#weather3');
const $weatherDiv3= $('#weather4');
const $weatherDiv4= $('#weather5');
const $weatherDiv5= $('#weather6');
const $weatherDiv12= $('#weather25');
const $myElement2=$("#myElement");
const $myElement3=$("#myElement1");
const $back1=$('#back');
const $click1=$('#click2');
const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    // Function to fetch weather data from OpenWeatherMap API
    async function fetchWeatherData(city) {
     // const apiKey = ; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${$input.val()}&appid=${openWeatherKey1}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          // Extract longitude and latitude from the weather data
          const longitude = data.coord.lon;
          const latitude = data.coord.lat;

          // Fetch pollution data using the latitude and longitude
          const pollutionData = await fetchPollutionData(latitude, longitude);

          return { longitude, latitude, pollutionData };
        } else {
          throw new Error(`Failed to fetch weather data: ${data.message}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Function to fetch pollution data from OpenWeatherMap API
    async function fetchPollutionData(latitude, longitude) {
      const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
      const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey1}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          // Extract pollution data
          const aqi = data.list[0].main.aqi;
          const pm2_5 = data.list[0].components.pm2_5;
          const pm10 = data.list[0].components.pm10;
          const so2 = data.list[0].components.so2;
          const no2 = data.list[0].components.no2;
          const co = data.list[0].components.co;
          const o3 = data.list[0].components.o3;

          return { aqi, pm2_5, pm10, so2, no2, co, o3 };
        } else {
          throw new Error(`Failed to fetch pollution data: ${data.message}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Function to handle form submission
    function handleSubmit() {
      const city = document.getElementById('cityInput').value;
      fetchWeatherData(city)
        .then(({ longitude, latitude, pollutionData }) => {
          document.getElementById('result').innerHTML = `Longitude: ${longitude}<br>
		  Latitude: ${latitude}<br>
		  AQI: ${pollutionData.aqi}<br>
		  PM2.5: ${pollutionData.pm2_5}<br>
		  PM10: ${pollutionData.pm10}<br>
		  SO2: ${pollutionData.so2}<br>
		  NO2: ${pollutionData.no2}<br>
		  CO: ${pollutionData.co}<br>
		  O3: ${pollutionData.o3}`;
        })
        .catch(error => {
          console.error(error);
          document.getElementById('result').innerHTML = 'Error: ' + error.message;
        });
    }
/*async function fetchWeatherData(city) {
	const apiKey = '8001908ab9c1725ef5083a0bf7f6c443'; // Replace with your OpenWeatherMap API key
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${$input.val()}&appid=${apiKey}`;

	try {
	  const response = await fetch(url);
	  const data = await response.json();

	  if (response.ok) {
		// Extract longitude and latitude from the weather data
		const longitude = data.coord.lon;
		const latitude = data.coord.lat;
       $myElement2.val(latitude);
		$myElement3.val(longitude);
		return { longitude, latitude };
	  } else {
		throw new Error(`Failed to fetch weather data: ${data.message}`);
	  }
	} catch (error) {
	  console.error(error);
	}
  }

  // Function to handle form submission
  function handleSubmit() {
	const city = document.getElementById('cityInput').value;
	fetchWeatherData(city)
	  .then(({ longitude, latitude }) => {
		document.getElementById('result').innerHTML = `Longitude: ${longitude}<br>Latitude: ${latitude}`;
	  })
	  .catch(error => {
		console.error(error);
		document.getElementById('result').innerHTML = 'Error: ' + error.message;
	  });
  }
/*async function getbackground() {
	const urlToFetch = `${weatherUrl2}?key=35269620-98ee0c8403501b5e12196cd0b&q=${$input.val()}&image_type=photo&pretty=true`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
}*/
/*let coordinates=null;
let endpoint;
if (coordinates === null) {
	endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${$input.val()}&appid=${openWeatherKey1}`;
  } 
  fetch(endpoint)
       .then(response=>response.json())
	   .then(data=>{
		if ("coord" in data) {
			const latitude = data.coord.lat;
			const longitude = data.coord.lon;
			document.getElementById("latitude1").textContent = `Latitude: ${latitude}`;
			document.getElementById("longitude1").textContent = `Longitude: ${longitude}`;
			$myElement2.val(latitude);
			$myElement3.val(longitude);
		  } else {
			console.error("Error: Failed to extract latitude and longitude from API response.");
		  }
		})
		.catch(error => {
			console.error(`Error: Failed to fetch data from OpenWeatherMap API. ${error}`);
		 });*/
 
const getVenues = async () => {
	const city = $input.val();
	const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
	// add try and catch
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			const venues = jsonResponse.response.groups[0].items.map((item) => item.venue);
			console.log(venues);
			return venues;
		}
	} catch (error) {
		console.log(error);
	}
};
const getpollution = async () => {
	const urlToFetch = `${weatherUrl2}?lat=${$myElement2.val()}&lon=${$myElement3.val()}&appid=${openWeatherKey1}`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};
// get Data from OpenWeather
const getForecast = async () => {
	const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};
const get5dayForecast = async () => {
	const urlToFetch = `${weatherUrl1}?&q=${$input.val()}&appid=${openWeatherKey1}`;
	try {
		const response = await fetch(urlToFetch);
		if (response.ok) {
			const jsonResponse = await response.json();
			return jsonResponse;
		}
	} catch (error) {
		console.log(error);
	}
};

// Render functions
const renderVenues = (venues) => {
	$venueDivs.forEach(($venue, index) => {
		const venue = venues[index];
		const venueIcon = venue.categories[0].icon;
		const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
		let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc,index);
			$venue.append(venueContent);
	});
	$destination.append(`<h2>${venues[0].location.city}</h2>`);
};
/*const renderbackground = (backg) => {
	const backgroundContent = createWeatherHTML3(backg);
	$back1.append( backgroundContent);
};*/
const renderForecast12= (day1) => {
	const weatherContent12 = createWeatherHTML12(day1);
	$weatherDiv12.append(weatherContent12);
};
const renderForecast = (day) => {
	const weatherContent = createWeatherHTML(day);
	$weatherDiv.append(weatherContent);
};
const renderForecast1 = (day1) => {
	const weatherContent1 = createWeatherHTML1(day1);
	$weatherDiv1.append(weatherContent1);
};
const renderForecast2 = (day2) => {
	const weatherContent2 = createWeatherHTML2(day2);
	$weatherDiv2.append(weatherContent2);
};
const renderForecast3 = (day3) => {
	const weatherContent3 = createWeatherHTML3(day3);
	$weatherDiv3.append(weatherContent3);
};
const renderForecast4 = (day4) => {
	const weatherContent4 = createWeatherHTML4(day4);
	$weatherDiv4.append(weatherContent4);
};
const renderForecast5 = (day5) => {
	const weatherContent5 = createWeatherHTML5(day5);
	$weatherDiv5.append(weatherContent5);
};

const executeSearch = () => {
	$venueDivs.forEach((venue) => venue.empty());
	$weatherDiv.empty();
	$weatherDiv1.empty();
	$destination.empty();
	$back1.empty();
	$container.css('visibility', 'visible');
	getpollution().then((forecast12) => renderForecast12(forecast12));
	getVenues().then((venues) => renderVenues(venues));
	getForecast().then((forecast) => renderForecast(forecast));
	get5dayForecast().then((weather) => renderForecast1(weather));
	get5dayForecast().then((weather2) => renderForecast2(weather2));
	get5dayForecast().then((weather3) => renderForecast3(weather3));
	get5dayForecast().then((weather4) => renderForecast4(weather4));
	get5dayForecast().then((weather5) => renderForecast5(weather5));
	
	//getbackground().then((back1g)=>renderbackground(back1g));
$(document).ready(function(){
	var originalHref = $("#click2").attr("href");
	$("#click2").click(function(){
		var userInput = $input.val();
		var newHref = originalHref.replace("3/", "3/" + userInput);
		$(this).attr("href", newHref);
	  });
	});
	return false;
};

$submit.click(executeSearch);