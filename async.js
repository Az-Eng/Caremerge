const helper = require('./utils/functions')


addresses = ["https://hntechs.com", "https://google.com", "https://youtube.com", "https://facebook.com"]



helper.getTitlesAsync(addresses, (err, titles) => {
    if (err) {
        console.log(err)
    } else {
        helper.makeHtmlResponseAsync(titles, (resToSend) => {
            console.log(resToSend)
        })
    }
})


