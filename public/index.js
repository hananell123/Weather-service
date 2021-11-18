
function close(){
    console.log("close!!!!!");
    document.getElementById("myModal").style.display = "none";
}

function get_ims_data(data,wind,temperature,humidity){
    let ims = {}
    if(!data["ims"]){
        return ims;
    }
    //extract data
    data["ims"].forEach(element =>{
        if(element.name==="TD"){
            if(temperature){
                ims["temperature"] = element.value
            }
        }
        else if(element.name==="WS"){
            if(wind){
                ims["wind speed"] =  element.value    
            }
        }
        else if(element.name==="WD"){
            if(wind){
                 ims["wind direction"] = element.value
            }
        }
        else if(element.name==="RH"){
            if(humidity){
                ims["humidity"] = element.value
            }
        }   
    })
    return ims;
}

function get_openWeather_data(data,wind,temperature,humidity){
    let openWeather = {}
    if(!data["openWeather"]){
        return openWeather
    }
    if(wind){
        openWeather["wind speed"] = data["openWeather"]["wind"].speed
        openWeather["wind direction"] = data["openWeather"]["wind"].deg
    }
    if(temperature){
        openWeather["temperature"] = data["openWeather"]["main"].temp
    }
    if(humidity){
        openWeather["humidity"] = data["openWeather"]["main"].humidity
    }
    return openWeather;
}

function calculate_deviation(dataBySite,dataRequire,dataTr){
    let deviation = document.getElementById("deviation").value
    if(dataRequire["wind"]){
        let deviationTd = document.createElement("td")
        dataTr["wind"].appendChild(deviationTd)
        if(Object.keys(dataBySite["ims"]).length!==0 && Object.keys(dataBySite["openWeather"]).length!==0){
            let windRes = (Math.abs(dataBySite["ims"]["wind speed"] - dataBySite["openWeather"]["wind speed"])/dataBySite["ims"]["wind speed"])*100; 
            if(windRes>deviation){
                deviationTd.innerHTML = "DEVIATION "+windRes.toFixed(2)+"%"
                deviationTd.style.color = "red"
            } 
            else{
                deviationTd.innerHTML = "OK"
                deviationTd.style.color = "green"
            }
        }
        else{
            deviationTd.innerText = "N\\A"
        }
    }
    if(dataRequire["temperature"]){
        let deviationTd = document.createElement("td")
        dataTr["temperature"].appendChild(deviationTd)
        if(Object.keys(dataBySite["ims"]).length!==0 && Object.keys(dataBySite["openWeather"]).length!==0){
            let temperatureRes = (Math.abs(dataBySite["ims"]["temperature"] - dataBySite["openWeather"]["temperature"])/dataBySite["ims"]["temperature"])*100;
            if(temperatureRes>deviation){
                deviationTd.innerHTML = "DEVIATION\n"+temperatureRes.toFixed(2)+"%"
                deviationTd.style.color = "red"
            } 
            else{
                deviationTd.innerHTML = "OK"
                deviationTd.style.color = "green"
            }
        }
        else{
            deviationTd.innerText = "N\\A"
        }
    }
    if(dataRequire["humidity"] ){
        let deviationTd = document.createElement("td")
        dataTr["humidity"].appendChild(deviationTd)
        if(Object.keys(dataBySite["ims"]).length!==0 && Object.keys(dataBySite["openWeather"]).length!==0){
            let humidityRes = (Math.abs(dataBySite["ims"]["humidity"] - dataBySite["openWeather"]["humidity"]))
            if(humidityRes>deviation){
                deviationTd.innerHTML = "DEVIATION "+humidityRes.toFixed(2)+"%"
                deviationTd.style.color = "red"
            } 
            else{
                deviationTd.innerHTML = "OK"
                deviationTd.style.color = "green"
            }
        }
        else{
            deviationTd.innerText = "N\\A"
        }
    }
}

function add_data_from_weather_sites(dataBySite,dataRequire,dataTr){
    Object.keys(dataBySite).forEach(function(k){
        let td = document.createElement("td")
        td.innerText = "website:\n"+k
        dataTr["headLine"].appendChild(td)
        if(dataRequire["wind"]){
            let tempWind = document.createElement("td")
            if(Object.keys(dataBySite[k]).length===0){
                tempWind.innerText = "N\\A";
            }
            else{
                tempWind.innerText = "speed:"+dataBySite[k]["wind speed"]+"m/sec"+", direction:"+dataBySite[k]["wind direction"]
            }
            
            dataTr["wind"].appendChild(tempWind)
        }
        if(dataRequire["temperature"]){
            let tempTemperature = document.createElement("td")
            if(Object.keys(dataBySite[k]).length===0){
                tempTemperature.innerText = "N\\A"
            }
            else{
                tempTemperature.innerText = "DegC:"+dataBySite[k]["temperature"]
            }
            dataTr["temperature"].appendChild(tempTemperature)
        }
        if(dataRequire["humidity"]){
            let tempHumidity = document.createElement("td")
            if(Object.keys(dataBySite[k]).length===0){
                tempHumidity.innerText = "N\\A"
            }
            else{
                tempHumidity.innerText = dataBySite[k]["humidity"]+"%"

            }
            dataTr["humidity"].appendChild(tempHumidity)
        }
    }); 
}

function init_result_table(myTable,dataRequire,dataTr){

    myTable.setAttribute("id","resultTable")
    let emptyTd = document.createElement("td")
    emptyTd.innerText = ""
    dataTr["headLine"].appendChild(emptyTd)
    
    Object.keys(dataRequire).forEach((key)=>{
        if(dataRequire[key]){
            dataTr[key] = document.createElement("tr")
            let firstCol = document.createElement("td")
            firstCol.innerText = key
            dataTr[key].appendChild(firstCol)
        }
    })
}

function show_whether_data(data){
    let myForm = document.getElementById("myForm");
    let dataRequire = {}
    let dataBySite = {}
    let dataTr = {}
    let myTable = document.createElement("table")
    dataTr["headLine"] = document.createElement("tr")

    Array.from(myForm).forEach((formElement,index)=>{
        if(formElement.type==="checkbox"){
            dataRequire[formElement.name]=formElement.checked;
        }
    })

    init_result_table(myTable,dataRequire,dataTr)
    // load relevant data from response data
    dataBySite["ims"] = get_ims_data(data,dataRequire["wind"],dataRequire["temperature"],dataRequire["humidity"])
    dataBySite["openWeather"] = get_openWeather_data(data,dataRequire["wind"],dataRequire["temperature"],dataRequire["humidity"])

    add_data_from_weather_sites(dataBySite,dataRequire,dataTr)
    let deviationTd = document.createElement("td")
    deviationTd.innerHTML = "deviation"
    dataTr["headLine"].appendChild(deviationTd)
    calculate_deviation(dataBySite,dataRequire,dataTr)
    Object.values(dataTr).forEach((tr)=>{
        myTable.appendChild(tr)
    })
    document.getElementById("myModal").appendChild(myTable)
    document.getElementById("myModal").style.display = "block";

}



function check_input(){
    let myForm = document.getElementById("myForm")
    let flag = false
    Array.from(myForm).forEach((formElement,index)=>{
        if(formElement.type==="checkbox"){
           
            if(formElement.checked){
                flag = true || flag;
            } 
        }
    })
    return flag

}
 function get_whether(){

    if(!check_input()){
        alert("לא הוכנסו שום פרמטרים לבקשה, אנא שלח שנית")
        return;
    }


    fetch('http://localhost:3001/data', {   
        method: 'GET'
        }).then((response)=>{
            response.json().then((text)=>{
            show_whether_data(text);
        })
    }).catch(err=>{console.log("Unsuccses",err)})

}
   

    