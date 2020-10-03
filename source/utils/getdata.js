const request = require('request')

const getTracks = ((options, callback)=>{
    request(options, (error, response)=>{
        if (error){
            return callback('Something went wrong please try again', undefined)
        }
        const dat= JSON.parse(response.body)

        if(dat.items.length !== 10){
            return callback('Come back when you\'ve listened to more songs!', undefined)
        }
        {
            // console.log(dat)
            var name= [], artist= [], uri= [], art= [] 
            for(i=0;i<10;i++){
                name[i]= dat.items[i].name
                artist[i]=dat.items[i].artists[0].name
                uri[i]= dat.items[i].uri
                art[i]= dat.items[i].album.images[2].url
            }
            callback(undefined, {
                name,
                artist,
                uri,
                art
        })
        }
    })
})

module.exports= getTracks