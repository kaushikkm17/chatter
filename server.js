//dependencies
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const PORT = process.env.PORT
const User = require('./models/user')
const user = require('./models/user')
const { findById } = require('./models/user')

//middleware
app.use(express.urlencoded({extended: true}))

//database configuration
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const DB = mongoose.connection
DB.on('error', (err) => console.log(err))
DB.on('connected', () => console.log('mongo is connected...'))
DB.on('disconnected', () => console.log('mongo is disconnected...'))

//ROUTES index, new, delete, update, create, edit, show
app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/signin', (req, res) => {
    res.render('signin.ejs')
})
app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})
app.post('/signup', (req, res) => {
    console.log(req.body)
    User.create(req.body, () => {
        res.redirect('/signup')
    })
})
app.post('/signin', (req, res) => {
    User.find({username:req.body.username, password: req.body.password}, (err, foundUser) => {
        res.redirect(`/${foundUser[0].username}`)
    })
})
app.get('/:username', (req, res) => {

    res.render('allchats.ejs')
})
app.get('/:username/:chattingwith', (req, res) => {
    res.render('chat.ejs')
})




//listener
app.listen(process.env.PORT || 3000, () => console.log('listening...'))