const axios = require('axios');

const yargs= require('yargs');

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

    console.log(`It is ${temp}. It feels like ${appear}`);

}).catch((e)=>{
    if(e.code==='ENOTFOUND')
    {
        console.log('unable to connect to API servers');
    }
    else{
        console.log(e.message);
    }
})




