const request = require('request');

var geocodeAddress = (address) =>{

    return new Promise((resolve,reject)=>{

        debugger;

        var encodeAddress= encodeURIComponent(address);

request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json:true
},(error,response,body)=>{

    if(error)
    {
        reject("unable to connect google servers");

    }
    else if(body.status === 'ZERO_RESULTS')
    {
        reject('unable to find that address');
    }
    else if(body.status === 'OK')
    {
        debugger;
        resolve({
            address:body.results[0].formatted_address,
            latitude:body.results[0].geometry.location.lat,
            longitude:body.results[0].geometry.location.lng
        })
    }
})

    })
}


geocodeAddress('0000').then((location)=>{
    console.log(JSON.stringify(location,undefined,2));
},(error)=>{
    console.log(error);
})