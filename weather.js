const express= require("express");
const bodyParser=require("body-parser");

const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/index.html");

    
});

app.post("/",(req,res)=>{

    const cityName=req.body.city;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=1e62f424e793f8d8a537595456bd24fe&units=metric";

    https.get(url,(response)=>{
        
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const weatherIcon="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";

            res.write("<h1>The temperature in "+cityName+" is "+temp+"</h1>");
            res.write("<p>The Weather is currently "+weatherDescription+"<p>");
            res.write("<img src="+weatherIcon+">");
            res.send();
        })


    })
})


app.listen(3000,()=>{
    console.log("Listening on port 3000");
})

// 67a8712bc5f4d55deffbbbeecf65591a