
// const yargs= require('yargs');

// const geocode = require('./geocode/geocode');

// const argv= yargs
//     .options({
//         a:{
//             describe:'give address you want to see weather',
//             demand:true,
//             alias:'address',
//             string:true
//         }
//     })
//     .help()
//     .argv;

// geocode.geocodeAddress(argv.a,(errorMessage,result)=>{
//     if(errorMessage)
//     {
//         console.log(errorMessage);
//     }
//     else{
//         console.log(result);
//     }
// });

//77319b3e45e2401ff0d8d3270d884781

const request= require('request')

request({
    url:'https://api.darksky.net/forecast/77319b3e45e2401ff0d8d3270d884781/37.8267,-122.4233',
    json:true
},(error,response,body)=>{
    if(!error && response.statusCode===200)
    {
    console.log(body.currently)
    }
    else{
        console.log('unable to fetch weather data');
    }
})