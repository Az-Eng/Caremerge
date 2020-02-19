const async = require('async')
const RSVP = require('rsvp')
const { scrapTitle, scrapTitlePromises } = require('./scraptitle')


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

// with Async
const getTitlesAsync = (addresses, callback) => {

    // if single address is given in query string convert it to array
    if (!Array.isArray(addresses)) {
        addresses = Array(addresses)
    }

    if (!addresses || addresses.length === 0) {
        callback("Please enter valid addresses", undefined)
        return
    }

    var titlesArray = []
    async.forEachSeries(addresses, (address, callback) => {

        scrapTitle(address, (title) => {
            titlesArray.push(title)
            callback();
        })

    }, (err) => {
        // if any error occur
        if (err) {
            console.log('Something went wrong');
            callback('Something went wrong', undefined)
        } else {
            console.log('All titles have been processed successfully');
            callback(undefined, titlesArray)
        }
    });

}

// with Async
const makeHtmlResponseAsync = (titles, callback) => {

    var resToSend = '<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>'

    async.forEachSeries(titles, (title, callback) => {

        resToSend = resToSend + '<li>' + title + '</li>'
        callback()

    }, () => {
        resToSend = resToSend + '</ul></body></html>'
        console.log('Html Processed successfully');
        callback(resToSend)

    });

}

// with promises
const getTitlesPromises = (addresses) => {

    const promise = new RSVP.Promise(function (resolve, reject) {

        // if single address is given in query string convert it to array
        if (!Array.isArray(addresses)) {
            addresses = Array(addresses)
        }

        // if no address is given or call with empty array
        if (!addresses || addresses.length === 0) {
            reject("No address is given")
            return
        }

        // iterate on each address to get the html title of web page
        const TitlesPromises = addresses.map(function (address) {
            return scrapTitlePromises(address)
        })

        // once all titles are resolved make an html response
        RSVP.all(TitlesPromises).then(function (titles) {
            makeHtmlResponsePromises(titles).then((resToSend) => {
                resolve(resToSend)
            })

        }).catch(function (reason) {
            // if any of the promises fails.
            console.log('Something Went wrong')
            reject("Something went wrong!")
        })
    })

    return promise
}

// with promises
const makeHtmlResponsePromises = (titles) => {

    const promise = new RSVP.Promise(function (resolve, reject) {

        var resToSend = '<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>'

        // iterate the array and make response 
        const HtmlResponsePromises = titles.map(function (title) {
            return resToSend = resToSend + '<li>' + title + '</li>'
        });

        // when all iterations are done successfully
        RSVP.all(HtmlResponsePromises).then(function (resToSend) {
            resToSend = resToSend + '</ul></body></html>'
        });

        // send the final response
        resolve(resToSend)

    })

    return promise
}

module.exports = {
    getTitles,
    makeHtmlResponse,
    getTitlesAsync,
    makeHtmlResponseAsync,
    getTitlesPromises,
    makeHtmlResponsePromises
}