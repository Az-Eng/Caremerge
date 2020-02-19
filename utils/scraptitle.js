const request = require('request')
const cheerio = require('cheerio')
const RSVP = require('rsvp')

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


// with Promises

const scrapTitlePromises = (address) => {

    const promise = new RSVP.Promise(function (resolve, reject) {

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
                    // send the address back (resolved)
                    resolve(address + '  -  ' + title)
                } else {
                    resolve(address + '   -   No Response')

                }
            })

        } catch (e) {
            // if unexpected error occured
            resolve(address + '   -   No Response')
        }

    })

    return promise

}

module.exports = {
    scrapTitle,
    scrapTitlePromises
}


