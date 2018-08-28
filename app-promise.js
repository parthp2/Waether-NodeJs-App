const axios = require('axios');

const yargs= require('yargs');

const fs= require('fs');

const argv= yargs
    .options({
        a:{
            describe:'give address you want to see weather',
            demand:false,
            alias:'address',
            string:true
        },
        d:{
            default:91776,
            alias:'default'
        }
    })
    .help()
    .alias('help','h')
    .argv;

var encodeAddress= encodeURIComponent(argv.a);

var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeURL).then((response)=>{

    if(response.data.status=== 'ZERO_RESULTS')
    {
        throw new Error('unable to find that address');
    }

    var lat=response.data.results[0].geometry.location.lat;

    var lng=response.data.results[0].geometry.location.lng;

    var weatherURL = `https://api.darksky.net/forecast/77319b3e45e2401ff0d8d3270d884781/${lat},${lng}`;

    console.log('address:',response.data.results[0].formatted_address);

    return axios.get(weatherURL);
}).then((response)=>{

    var temp=response.data.currently.temperature;
    var appear=response.data.currently.apparentTemperature;
    var Humidity=response.data.currently.humidity;
    var Pressure=response.data.currently.pressure;
    var windspeed=response.data.currently.windSpeed;

    

    console.log(`It is ${temp}. It feels like ${appear}`);
    console.log("Humidity:",Humidity);
    console.log('Pressure:',Pressure);
    console.log('wind Speed:',windspeed);

    var weathers=[]

    try
    {
      weathers=JSON.parse(fs.readFileSync('weather.json'));
    }
    catch(e)
    {
         weathers=[];
    } 

    var weather={
        temperature:temp,
        apparentTemperature:appear,
        Humidity,
        Pressure,
        windspeed
    };

    weathers.push(weather);

    fs.writeFileSync('weather.json',JSON.stringify(weathers));

}).catch((e)=>{
    if(e.code==='ENOTFOUND')
    {
        console.log('unable to connect to API servers');
    }
    else{
        console.log(e.message);
    }
})




