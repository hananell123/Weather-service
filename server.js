const express = require('express')
const weather = require('openweather-apis');
const app = express()
const port = 3001
const request = require('request');

app.use(express.static('public'))

app.get('/',function (req, res) {
    res.sendFile('index.html') 
})


// open weather 
 app.get('/data', async (req, res)=>{
  weather.setLang('en')
  weather.setCity('Salfit')
  weather.setUnits('metric')
  weather.setAPPID('d23fd3eefd5786c02c6b52afef8a5793')

  const result = {} 
  weather.getAllWeather((err,data)=>{
    if(err){
        console.log("getAllWeather callback error",err);
     }
     else if(data){
        console.log("getAllWeather callback")
        result["site1"] = data;
        console.log(result);
        console.log(Object.keys(result).length);
        if(Object.keys(result).length==2){
          res.status(200).send(result);
        }
     }
    })

// https://ims.gov.il/sites/default/files/2021-09/API%20explanation.pdf
    let api2_req = {
      method: 'GET',
      json: true,
      url: "https://api.ims.gov.il/v1/Envista/stations/20/data/latest",
      headers: {
       'Authorization': 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
      }
    }
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("in callback2");
          result["site2"] = body.data[0].channels
          if(Object.keys(result).length==2){
            res.status(200).send(result);
          }
        }

  }
  request(api2_req, callback);
})     


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})