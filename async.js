const helper = require('./utils/functions')


addresses = ['ada']



helper.getTitlesAsync(addresses, (err, titles) => {
    if (err) {
        console.log(err)
    } else {
        helper.makeHtmlResponseAsync(titles, (resToSend) => {
            console.log(resToSend)
        })
    }
})


