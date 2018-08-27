const request=require('request');

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
    .argv;

var encodeAddress= encodeURIComponent(argv.a);

request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json:true
},(error,response,body)=>{
    if(error)
    {
        console.log("unable to connect google servers");
    }
    else if(body.status === 'ZERO_RESULTS')
    {
        console.log('unable to find that address');
    }
    else if(body.status === 'OK')
    {
    console.log(`Address:${body.results[0].formatted_address}`);
    console.log(`Latitude:${body.results[0].geometry.location.lat}`);
    console.log(`Longitude:${body.results[0].geometry.location.lng}`);
    }
})