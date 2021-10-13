
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





    async function helper(){




    }
async function test2(){
    // const openWe = await fetch('http://localhost:3000/data', {   
    //     method: 'GET'
    //     }).then((response)=>{
    //         response.text().then((text)=>{
    //         console.log(text);
    //        // document.getElementById("yosef").innerHTML = text;
    //     })
    // }).catch(err=>{console.log("Unsuccses",err)})

    console.log("----------------------------------------------------------------------")

    const ims = await fetch('http://localhost:3000/data', {   
        method: 'GET'
        }).then((response)=>{
            response.json().then((text)=>{
            document.getElementById("yosef").innerHTML = text;
            // document.getElementById("yosef1").innerHTML = ims[1];

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