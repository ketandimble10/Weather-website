//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=77d5fc0e6268c1ced19deaec8dde5936&query='+ lat +','+ long +',73.8567&units=f'

    request({ url,json:true},(error,response) => {   // Destructuring body here remove 'response' because it is object
        if (error){
            callback('Unable to connect to weather services',undefined)
        }else if (response.body.error){   // removing response from here
            callback('unable to find location',undefined)
        }else{
            callback(undefined,response.body.current.weather_descriptions + ', It is currently ' + response.body.current.temperature + ' degrees out, there is an ' + response.body.current.precip + ' percent chance of rain.')
        }
    }) 
}


module.exports = forecast
