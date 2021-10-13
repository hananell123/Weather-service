
// var weather = require('openweather-apis');
// weather.setLang('en')
// weather.setCity('Salfit')
// weather.setUnits('metric')
// weather.setAPPID('d23fd3eefd5786c02c6b52afef8a5793')
 
// weather.getAllWeather(function(err, JSONObj){
//     console.log(JSONObj.main)
// });

var token = "f058958a-d8bd-47cc-95d7-7ecf98610e47"

url = "https://api.ims.gov.il/v1/Envista/stations"
headers = {
    'Authorization': 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
  }

  const xhttp = new XMLHttpRequest();
  xhttp.headers = 
  xhttp.open("GET", "ajax_info.txt");
xhttp.send();
// //openweather site
// weather.getAllWeather(function(err, JSONObj){
  

//    console.log(JSONObj)
//    {
//     coord: { lon: 35.1808, lat: 32.0837 },
//     weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' } ],
//     base: 'stations',
//     main: {
//       temp: 28.24,
//       feels_like: 29.13,
//       temp_min: 26.5,
//       temp_max: 32.78,
//       pressure: 1009,
//       humidity: 54,
//       sea_level: 1009,
//       grnd_level: 953
//     },
//     visibility: 10000,
//     wind: { speed: 5.39, deg: 310, gust: 3.65 },
//     clouds: { all: 0 },
//     dt: 1630501797,
//     sys: {
//       type: 2,
//       id: 2039429,
//       country: 'PS',
//       sunrise: 1630466082,
//       sunset: 1630512260
//     },
//     timezone: 10800,
//     id: 282039,
// //     name: 'Salfīt',
// //     cod: 200
// //   }
// });

