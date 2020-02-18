const scrapTitle = require('./scraptitle')


const getTitles = (addresses, callback) => {

    // if single address is given in query string convert it to array
    if (!Array.isArray(addresses)) {
        addresses = Array(addresses)
    }

    // if no address is given or call with empty array
    if (!addresses || addresses.length === 0) {
        callback("Please enter valid addresses", undefined)
    }

    var titlesArray = []
    counter = addresses.length

    addresses.forEach(address => {

        //scrap the title on by one from webpages
        scrapTitle(address, (title) => {

            titlesArray.push(title)

            // to produce async behavior (don't call back untill loop is over) 
            setTimeout(function () {
                counter -= 1;
                if (counter === 0) {
                    // callback the titles array
                    callback(undefined, titlesArray)
                }
            }, 1);

        })

    })

}

// use the titles array and create html response to send back
const makeHtmlResponse = (titles, callback) => {
    var resToSend = '<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>'
    var counter = titles.length
    titles.forEach(title => {
        resToSend = resToSend + '<li>' + title + '</li>'
        // to make async behavior
        setTimeout(function () {
            counter -= 1;
            if (counter === 0) {
                resToSend = resToSend + '</ul></body></html>'
                console.log(resToSend)
                callback(resToSend)
            }
        }, 1);
    });
}


module.exports = {
    getTitles,
    makeHtmlResponse
}