const request = require('request')
const cheerio = require('cheerio')

const scrapTitle = (address, callback) => {

    try {

        request.get({ url: address }, (error, response) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(response.body)
                const title = $("title").text()
                callback(title)
            } else {
                callback(address + ' - No Response')
            }
        })

    } catch (e) {
        console.log(address + " - NO RESPONSE")
    }


}

module.exports = scrapTitle


