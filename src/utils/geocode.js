//  single reusable function

const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoia2V0YW5kIiwiYSI6ImNsNDcyZHg0ZzBkaGozaW1vcjU5eXBoNTgifQ.DtM819ZbAXNupPKV51n4pw&limit=1'

    request({ url, json: true},(error,response)=>{
        if (error){
            callback('Unable to connect server', undefined)    // callback function expects error and data, if we dont provide value in data the it will return undefined
        }else if (response.body.features.length === 0 ){      // if the search length is 0 then will cause error
            callback('Unable to find location. try another search', undefined)
        }else{
            callback(undefined, {
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports =geocode



