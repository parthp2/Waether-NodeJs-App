
const yargs= require('yargs');

const geocode = require('./geocode/geocode');

const weather = require('./weather/weather');

const argv= yargs
    .options({
        a:{
            describe:'give address you want to see weather',
            demand:true,
            alias:'address',
            string:true
        }
    })
    .help()
    .argv;

geocode.geocodeAddress(argv.a,(errorMessage,result)=>{
    if(errorMessage)
    {
        console.log(errorMessage);
    }
    else{
        console.log(result.address);
        weather.getWeather(result.latitude,result.longitude,(errorMessage,response)=>{
            if(errorMessage)
            {
                console.log(errorMessage);
            }
            else{
                console.log(`it is currently ${response.Temperature}. It feels like ${response.Appearanttemperatue}`);
            }
        });
    }
});


