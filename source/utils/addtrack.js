const request = require('request')



const addTracks = ((options, callback) => {
    request(options, (error, response) => {
        if (error) {
            return callback('Something went wrong while adding Tracks to your playlist. Please try again', undefined)
        } {
            let playOver = JSON.parse(response.body)
            if (!playOver.snapshot_id) {
                return callback('Something went wrong while adding Tracks to your playlist. Please try again', undefined)
            }
            // console.log(playOver)
            return callback(undefined, playOver.snapshot_id)
        }
    })
})

module.exports = addTracks