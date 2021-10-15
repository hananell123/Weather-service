
function get_data_from_user(temp,hum,wind,exep){
    var weatherObj = {}
    var counter = 0;
    if(hum.checked){
        counter++

    }
    if(temp.checked){
        counter++
    }
    if(wind.checked){
        counter++
    }
    if(counter==0){
        alert("לא נבחר מידע להצגה")  
    }
    else{



        get_data_from_weather_sites(weatherObj)
        //creat_result_table(weatherObj,hum.checked,temp.checked,wind.checked,exep)

    }

}


function lazar(){
    // let x = document.getElementById("myForm");
    // console.log(x.deviation.value);
    // console.log(x.wind.checked);
}

function calculate_pres(){

}

function get_wind(data){
    // let wind = document.createElement("tr")
    // let wind1 = document.createElement("td")
    // wind1.innerText = "Wind"
    // wind.appendChild(wind1)
    let wind = {}

    if(data["ims"]){
        wind["ims"] = data["ims"] 
        

    }
    else{
        console.log("error ims",data["ims"]);
    }
    

}

function get_temperatur(){

}

function get_humidity(){

}

function get_ims_data(data){
    let ims = {}
    data["ims"].forEach(element =>{
        if(element.name==="TD"){
            ims["temperature"] = element.value
        }
        else if(element.name==="WS"){
           ims["wind speed"] =  element.value    
        }
        else if(element.name==="WD"){
            ims["wind direction"] = element.value

        }
        else if(element.name==="RH"){
            ims["humidity"] = element.value

        }
        
    })
    return ims;
}

function get_openWeather_data(data){
    let openWeather = {}
    openWeather["wind speed"] = data["openWeather"]["wind"].speed
    openWeather["wind direction"] = data["openWeather"]["deg"].deg

    openWeather["humidity"] = data["openWeather"]["main"].humidity
    openWeather["temperatur"] = data["openWeather"]["main"].temp

    return openWeather;


}

function show_whether_data(data){
    let myForm = document.getElementById("myForm");
    let myTable = document.createElement("table");
    myTable.setAttribute("id", "myTable");

    let headline = document.createElement("tr")
    let td = document.createElement("td")
    headline.appendChild(td)
    Object.keys(data).forEach(function(k){
        td = document.createElement("td")
        td.innerText = k
        headline.appendChild(td)
        console.log(k);
    });
    td = document.createElement("td")
    td.innerText = "חריגה"
    headline.appendChild(td)
    myTable.appendChild(headline)
    document.body.appendChild(myTable)

    if(myForm.wind.checked){
        let wind = get_wind(data)

    }
    if(myForm.humidity.checked){

    }
    if(myForm.temp.checked){
        
    }
    
    
    
   
   
    
    

}
function get_whether(){
    fetch('http://localhost:3001/data', {   
        method: 'GET'
        }).then((response)=>{
            response.json().then((text)=>{
            show_whether_data(text);
        })
    }).catch(err=>{console.log("Unsuccses",err)})

    // .then(data=>data.text()).then(text=> console.log(text))
    // fetch('http://localhost:3000/data', {
    //     method: 'GET',  
    //     })
    // .then(response => response.text()).then(data=>console.log(data))
}
   

    // weatherObj.temp[0] =  JSONObj.main.temp
    // weatherObj.humidity[0] = JSONObj.main.humidity
    // weatherObj.wind[0] = JSONObj.main.wind


    // body.data[0].channels.forEach(element => {
    //     if(element.name =='TD')
    //       weatherObj.temp[1]=element.value
    //       else if(element.name =='WS')
    //       weatherObj.wind[1]=element.value
    //       else if(element.name =='RH')
    //       weatherObj.humidity[1]=element.value
    //     });
   


//tr = line
// function creat_result_table(weatherObj,temp,hum,wind){
//     var myTable = document.getElementsById("myTable")
//     if(temp){
//         var t1 = document.createElement("tr")
//         var t1_0 = document.createElement("th")
//         t1_0.innerHTML = "temp"
//         var t1_1 = document.createElement("th")
//         t1_1.innerHTML = weatherObj.temp[0]
//         var t1_2 = document.createElement("th")
//         t1_2.innerHTML = weatherObj.temp[1]
//         var t1_3 = document.createElement("th")
//         t1_3.innerHTML = weatherObj.temp[2]
//         t1.appendChild(t1_0)
//         t1.appendChild(t1_1)
//         t1.appendChild(t1_2)
//         t1.appendChild(t1_3)
//         myTable.appendChild(t1)
//     }

//     if(wind){
//         var t1 = document.createElement("tr")
//         var t1_0 = document.createElement("th")
//         t1_0.innerHTML = "wind"
//         var t1_1 = document.createElement("th")
//         t1_1.innerHTML = weatherObj.wind[0]
//         var t1_2 = document.createElement("th")
//         t1_2.innerHTML = weatherObj.wind[1]
//         var t1_3 = document.createElement("th")
//         t1_3.innerHTML = weatherObj.wind[2]
//         t1.appendChild(t1_0)
//         t1.appendChild(t1_1)
//         t1.appendChild(t1_2)
//         t1.appendChild(t1_3)
//         myTable.appendChild(t1)
//     }

//     if(hum){
//         var t1 = document.createElement("tr")
//         var t1_0 = document.createElement("th")
//         t1_0.innerHTML = "temp"
//         var t1_1 = document.createElement("th")
//         t1_1.innerHTML = weatherObj.humidity[0]
//         var t1_2 = document.createElement("th")
//         t1_2.innerHTML = weatherObj.humidity[1]
//         var t1_3 = document.createElement("th")
//         t1_3.innerHTML = weatherObj.humidity[2]
//         t1.appendChild(t1_0)
//         t1.appendChild(t1_1)
//         t1.appendChild(t1_2)
//         t1.appendChild(t1_3)
//         myTable.appendChild(t1)
//     }
//     myTable.style.display = "block"
// }