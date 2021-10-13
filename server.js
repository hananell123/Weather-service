const express = require('express')
var weather = require('openweather-apis');
const { get } = require('request');
const app = express()
const port = 3000
app.use(express.static('public'))





app.get('/',function (req, res) {
    res.sendFile('index.html') 
})

function h1(res){
  console.log(res.statusCode)
  res.send(" work!!!!")
 
  }

function fu2(res,get_weather){
  res.send("testt")
  weather.getAllWeather(get_weather)

}
// open weather 
 app.get('/data', async (req, res)=>{
  var data1,data2;
  weather.setLang('en')
  weather.setCity('Salfit')
  weather.setUnits('metric')
  weather.setAPPID('d23fd3eefd5786c02c6b52afef8a5793')

  weather.getAllWeather((err,data)=>{
     if(err){
      console.log("in callback error")

     }
     else if(data){
       console.log("in callback")
        data1=data
     }
      
    })

    var request = require('request');
// https://ims.gov.il/sites/default/files/2021-09/API%20explanation.pdf
    var req = {
      method: 'GET',
      json: true,
      url: "https://api.ims.gov.il/v1/Envista/stations/20/data/latest",
      headers: {
       'Authorization': 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
      }
    }
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("in callback2")

     data2 =  body.data[0].channels
}

}
//call the request
request(req, callback);

})     
//   var pro =  new Promise((resolve,reject) => {
//     weather.setLang('en')
//     weather.setCity('Salfit')
//     weather.setUnits('metric')
//     weather.setAPPID('d23fd3eefd5786c02c6b52afef8a5793')
//     console.log("befor get json")
  
//     weather.getAllWeather (function(err,myJSN){
//      if(myJSN){
//        console.log("resolve")
//        resolve("uriek")
//      }
//      else{  
//       console.log("reject")

//        reject("erroring")
//      }
// })
//   });

//   pro.then((data,data2)=>{
//     console.log(data,data2)
//     res.send("afdsfds")
//   })

 app.get('/getData',function(req, res) {
  var request = require('request');
// https://ims.gov.il/sites/default/files/2021-09/API%20explanation.pdf
var req = {
    method: 'GET',
    json: true,
    url: "https://api.ims.gov.il/v1/Envista/stations/20/data/latest",
    headers: {
      'Authorization': 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
    }
  }
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      body
      console.log(body.data[0].channels)
     return res.send(body)
}
}
//call the request
request(req, callback);
// res.send(ans[0])
})
// app.get('/form', (req, res) =>{
   
//         console.log(req.query)
// })


// app.post('/form', (req, res) => {
   
//     res.sendFile('result.html', { root: __dirname + "/public" } );
//     //res.send(midd.res)
//    // res.sendFile('orders.html', { root: __dirname + "/public" } );
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})