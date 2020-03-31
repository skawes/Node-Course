const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/825e376f4f86c11ed8f522718d1e8a75/' + latitude + ',' + longitude;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (response.body.error) {
            callback('Inavlid loaction name', undefined)

        } else {
           callback(undefined,response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }

    })
}


module.exports = forecast