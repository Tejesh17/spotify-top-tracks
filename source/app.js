
const express = require('express')
const path = require('path')
const request = require ('request')
const date = require('date-and-time');
const now = new Date();

const getTracks= require('./utils/getdata')
const { error } = require('console')
const { response } = require('express')


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
        token = req.query.token
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

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
    };
    let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: headers
    };

    const getID = ((options, callback)=>{
        request(options,(error, response)=>{
            if (error){
                return callback('Something went wrong, please try again',undefined)
            }
            {
                var userjson= JSON.parse(response.body)
                return callback(undefined, userjson.id)    
            }
        })
    })
    getID(options, (error,response)=>{
        if(error){
            console.log(error)
        }else{
            console.log(response)
            USERID = response

        }
    })
    date.format(now,'DD')
    console.log(date.format(now,'DD'))

    date.format(now, 'MMM YYYY');



    let dataString = `{"name":"${date.format(now, 'MMM YY')}","description":"Your top played songs in the month of ","public":true}`;
    
    let optionsP = {
        url: `https://api.spotify.com/v1/users/${USERID}/playlists`,
        method: 'POST',
        headers: headers,
        body: dataString
    };
    
    function callback(error, response, body) {
        if (!error ){//&& response.statusCode == 200) {
            console.log(response.body);
        }
    }
    
    request(optionsP, callback);






})






app.get('/test', (req,res)=>{
    res.render('test')
})




app.listen(3000,()=>{
    console.log('server started on port 3000')
})