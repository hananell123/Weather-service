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
  let api_counter = 2;
  weather.getAllWeather((err,data)=>{
    if(err){
        console.log("getAllWeather callback error",err);
        api_counter--;
     }
     else if(data){
        console.log("getAllWeather callback")
        result["openWeather"] = data;
        if(Object.keys(result).length==api_counter){
          res.status(200).send(result);
          console.log(result["openWeather"]["main"].temp)
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
        if(error || response.statusCode !== 200){
          
          result["ims"] = error
          if(Object.keys(result).length==api_counter){
            res.status(200).send(result);
           
          }
        }
        else{
          console.log("in callback2");
          result["ims"] = body.data[0].channels
          if(Object.keys(result).length==api_counter){
            res.status(200).send(result);
            console.log(result["ims"])
          }
        }

  }
  request(api2_req, callback);
})     


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})