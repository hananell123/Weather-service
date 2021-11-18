const express = require('express')
const weather = require('openweather-apis');
var crypto = require("crypto");
const app = express()
const port = 3001
const request = require('request');
const { response } = require('express');
const API_NUMBER = 2
const result = {} 

app.use(express.static('public'))

app.get('/',function (req, res) {
  console.log("hello")
    res.sendFile('index.html') 
})

app.get('/result',function (req, res) {
  res.sendFile('index.html') 
})

function get_whether_link(){

  var parameters = {
    "api-key": "fajikduieyuukvk9qdwmq76madtkwpdw",
    "api-secret": "ynnl019bcoure84z0q9kawmyfgkoobdy", 
    "t":Math.floor(Date.now()/1000)
  }; 
  var parameterNamesSorted = [];
  for (var parameterName in parameters) {
    parameterNamesSorted.push(parameterName);
  }
  parameterNamesSorted.sort();
  
  
  var apiSecret = parameters["api-secret"];
  delete parameters["api-secret"];
  parameterNamesSorted.splice(parameterNamesSorted.indexOf("api-secret"), 1);
  
  var data = "";
  for (var parameterName of parameterNamesSorted) {
    data = data + parameterName + parameters[parameterName];
  }
  
  var hmac = crypto.createHmac("sha256", apiSecret);
  hmac.update(data);
  var apiSignature = hmac.digest("hex");
  
  
  /*
  Now that the API Signature is calculated let's see what the final
  v2 API URL would look like for this scenario.
  */
  console.log("v2 API URL: https://api.weatherlink.com/v2/stations"+ 
    "?api-key=" + parameters["api-key"] + 
    "&t="+parameters["t"]+
    "&api-signature=" + apiSignature + 
    "&t=" + parameters["t"]);
    
  request.get("https://api.weatherlink.com/v2/stations"+ 
  "?api-key=" + parameters["api-key"] +
  "&t="+parameters["t"] +
  "&api-signature=" + apiSignature 
  ,(req,err,body)=>{

   
    console.log("body - ",body);

  })
  
}

  function get_openWeather_data(res){
  weather.setLang('en')
  weather.setCity('Salfit')
  weather.setUnits('metric')
  weather.setAPPID('d23fd3eefd5786c02c6b52afef8a5793')
  weather.getAllWeather((err,data)=>{
    if(err){
      result["openWeather"] = err;
      console.log("finished openWeather call with error");
     }
     else if(data){
        result["openWeather"] = data;
        console.log("finished openWeather call ")
     }
     if(Object.keys(result).length==API_NUMBER){
      res.status(200).send(result);
    }

    })

}

 function get_ims_data(res){
   console.log("start ims");
  let imsApiRequest = {
    method: 'GET',
    json: true,
    url: "https://api.ims.gov.il/v1/Envista/stations/20/data/latest",
    headers: {
     'Authorization': 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
    }
  }
  request(imsApiRequest, (error, response, body)=>{
    if(error || response.statusCode !== 200){
        
      result["ims"] = error
      console.log("finished ims call with error");
     
    }
    else{
      console.log("finished ims call");
      result["ims"] = body.data[0].channels
    }
    if(Object.keys(result).length==API_NUMBER){
      res.status(200).send(result);
    }


  });
}

 app.get('/data', async (req, res)=>{
  console.log("heyyy");
  // get_ims_data(res);
  // get_openWeather_data(res);
  get_whether_link();
  
})     


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})