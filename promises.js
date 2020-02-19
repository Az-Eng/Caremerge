const help = require('./utils/functions')

addresses = ["https://hntechs.com", "google.com", "https://youtube.com", "https://facebook.com"]





help.getTitlesPromises(addresses).then((resToSend) => {
    console.log('recieving response...')
    console.log(resToSend)
}).catch((err) => {
    console.log(err)
})

