
const express = require('express')
const path = require('path')
const request = require ('request')
const fs = require('file-system')

const getTracks= require('./utils/getdata')


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

app.get('/test', (req,res)=>{
    res.render('test')
})



app.listen(3000,()=>{
    console.log('server started on port 3000')
})