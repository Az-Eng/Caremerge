const request = require('request')
const cheerio = require('cheerio')

const scrapTitle = (address, callback) => {

    try {
        // if address is not provided with http or https
        if (address.substring(0, 8).toUpperCase() != "HTTPS://" && address.substring(0, 7).toUpperCase() != "HTTP://") {
            address = "http://" + address;
        }

        // get the html of webpage and grab title tag
        request.get({ url: address }, (error, response) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(response.body)
                const title = $("title").text()
                callback(address + '  -  ' + title)
            } else {
                callback(address + '   -   No Response')
            }
        })

    } catch (e) {
        console.log(address + " - NO RESPONSE")
    }


}

module.exports = scrapTitle


