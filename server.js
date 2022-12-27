//dependencies
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const PORT = process.env.PORT

//middleware

//ROUTES
app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/signin', (req, res) => {
    res.render('signin.ejs')
})
app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})
app.get('/:id', (req, res) => {
    res.render('allchats.ejs')
})
app.get('/:id/:user', (req, res) => {
    res.render('chat.ejs')
})





//listener
app.listen(process.env.PORT || 3000, () => {console.log('listening...')})