
const express = require('express')
const path = require('path')
const request = require ('request')
const date = require('date-and-time');
const now = new Date();

const getTracks= require('./utils/getdata')
const getID= require('./utils/playlist')
const genPlaylist= require('./utils/playlist')
const addTracks= require('./utils/playlist')


const app = express()


app.set('view engine','hbs')
app.set('views', path.join(__dirname,'../views'))

app.get('/', (req,res)=>{
    res.render('home')
})


app.get('/after', (req,res)=>{
    res.render('dash')
})



app.get('/getdata', (req,res)=>{
    if (!req.query.token){
        console.log("no token")
    }else{
        const token = req.query.token
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        };
        let options = {
            url: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10',
            headers: headers
        };
        getTracks(options, (error, {name,artist, uri, art} ={}) =>{
            if (error){
                console.log(error)
                res.send({error})
            }
            else{
                console.log({name, artist})
                res.app.set('token', token)
                res.app.set('uri',uri)
                res.send({
                    name,
                    artist,
                    uri,
                    art
                })
            }
        })
    }
})




app.get('/playlist', (req,res)=>{
    res.render('playlist')
})


app.get('/generateplaylist', (req,res)=>{
    const token = res.app.get('token')
    console.log(token)
    const uri = res.app.get('uri')
    date.format(now,'DD')
    console.log(date.format(now,'DD'))
    date.format(now, 'MMM YYYY');

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
    };
    let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: headers
    };
    let dataString = `{"name":"${date.format(now, 'MMM YY')}","description":"Your top played songs in the month of ${date.format(now, 'MMM YY')}","public":false}`;



    getID(options, (error,response)=>{
        if(error){
            console.log(error)
        }else{
            console.log(response)
            optionsP = {
                url: `https://api.spotify.com/v1/users/${response}/playlists`,
                method: 'POST',
                headers: headers,
                body: dataString
            }
            genPlaylist (optionsP, (error,response)=>{
                if (error){
                    console.log(error)
                }else{
                    // console.log(uri)
                    console.log(response)




                    var options = {
                        url: `https://api.spotify.com/v1/playlists/${response}/tracks?uris=${encodeURIComponent(uri)}`,
                        method: 'POST',
                        headers: headers
                    };



                    addTracks(options,(error, response)=>{
                        if (error)
                        {
                            console.log(error)
                        }else {
                            console.log(response)
                        }
                    })


                }
            })
        }



    })




})






app.get('/test', (req,res)=>{
    res.render('test')
})




app.listen(3000,()=>{
    console.log('server started on port 3000')
})