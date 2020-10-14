const request = require('request')





const getID = ((options, callback)=>{
    request(options,(error, response)=>{
        if (error){
            return callback('Something went wrong while retreiving your User ID, please try again.',undefined)
        }
        {
            let userjson= JSON.parse(response.body)
            return callback(undefined, userjson.id)    
        }
    })
})



const genPlaylist = ((options, callback)=>{
    request(options, (error, response)=>{
        if (error){
            return callback('Something went wrong while creating the playlist, Please try again.', undefined)
        }
        {
        let playid= JSON.parse(response.body)
        return callback(undefined, playid.id)
        }
    })
})  






                    const addTracks = ((options, callback)=>{
                        request(options, (error, response)=>{
                            if(error){
                                return callback('Something went wrong while adding Tracks to your playlist. Please try again',undefined)
                            }
                            {
                                let playOver = JSON.parse(response.body)
                                console.log(playOver)
                                return callback(undefined,playOver)
                            }
                        })
                    })






module.exports= addTracks 
module.exports= getID
module.exports = genPlaylist
