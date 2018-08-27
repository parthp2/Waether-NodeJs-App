const request= require('request')

var getWeather = (lat,lng,callback) =>{

request({
    url:`https://api.darksky.net/forecast/77319b3e45e2401ff0d8d3270d884781/${lat},${lng}`,
    json:true
},(error,response,body)=>{
    if(!error && response.statusCode===200)
    {
        callback(undefined,{
            Appearanttemperatue:body.currently.apparentTemperature,
            Temperature:body.currently.temperature
        })
    }
    else{
        callback('unable to fetch weather data');
    }
})

}

module.exports.getWeather = getWeather;