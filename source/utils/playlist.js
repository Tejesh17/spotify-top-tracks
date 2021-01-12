const request = require('request')

const getID = ((options, callback) => {
    request(options, (error, response) => {
        if (error) {
            return callback('Something went wrong while retreiving your User ID, please try again.', undefined)
        } {
            let userjson = JSON.parse(response.body)
            if (!userjson.id) {
                return callback('Something went wrong while retreiving your User ID, please try again.', undefined)
            }
            return callback(undefined, userjson.id)
        }
    })
})

const genPlaylist = ((options, callback) => {
    request(options, (error, response) => {
        if (error) {
            return callback('Something went wrong while creating the playlist, Please try again.', undefined)
        } {
            let playid = JSON.parse(response.body)
            if (!playid.id) {
                return callback('Something went wrong while creating the playlist, please try again.', undefined)
            }

            return callback(undefined, playid.id)
        }
    })
})

module.exports = getID
module.exports = genPlaylist