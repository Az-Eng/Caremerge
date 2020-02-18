const http = require('http');
const url = require('url')
const { getTitles, makeHtmlResponse } = require('./utils/functions')


//create a server object:
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' }); // http header

    const path = url.parse(req.url, true).pathname
    const queryObj = url.parse(req.url, true).query

    if (path === '/I/want/title' || path === '/I/want/title/') {

        // if no address is given
        if (!queryObj.address) {
            res.write('Please provide some valid address')
            res.end()
            return
        }
        // get the HTML titles of given addresses
        getTitles(queryObj.address, (error, titles) => {

            if (error) {
                res.write('Something Went wrong - try again')
                res.end()
            } else {
                // to get the html 
                makeHtmlResponse(titles, (resToWrite) => {
                    res.write(resToWrite); //write a response
                    res.end(); //end the response
                })
            }
        })

    } else {
        res.write('<h1>404 page<h1>'); //write a response
        res.end(); //end the response
    }

}).listen(3000, function () {
    console.log("server start at port 3000"); //the server object listens on port 3000
});

