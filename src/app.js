const path=require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express=require('express')
const app=express()
const publicPath=path.join(__dirname,'../views')
app.set('view engine','hbs')
app.use(express.static(publicPath))
console.log(publicPath)
app.get('',(req,res)=>{
res.render('index')
})
app.get('/about',(req,res)=>{
    res.render('about')
    })
    app.get('/help',(req,res)=>{
        res.render('about')
        })
app.get('/weather',(req,res)=>{
    if(req.query.address){
        const location=req.query.address
        geocode(location, (error, data) => {
            if(error){
                res.send(error)
            }
            console.log('Error', error)
            console.log('Data', data)
            forecast(data.longitude,data.latitude, (error, forecastData) => {
                console.log('Error', error)
                console.log(forecastData)
               res.send({
                   Data:forecastData
               
               })
            })
            
        })
    }else{
        return res.send({
            error:'You must provide address'
        })
    }
})
app.listen(3000,()=>{
    console.log('Server is up')
})
