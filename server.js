//dependencies
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const PORT = process.env.PORT
const User = require('./models/user.js')
const Page = require('./models/page.js')
const Message = require('./models/message.js')



//middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

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
app.route('/signin')
    .get((req, res) => {
        res.render('signin.ejs')
    })
    .post((req, res) => {
        User.find(
            {
                username: req.body.username,
                password: req.body.password,
            },
            (err, foundUser) => {
                console.log(foundUser)
                res.redirect(`/${foundUser[0].username}`)
            }
        )
    })
app.route('/signup')
    .get((req, res) => {
        res.render('signup.ejs')
    })
    .post((req, res) => {
        console.log(User);
        User.create({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
        }, () => {
            res.redirect(`/${req.body.username}`)
        })
    })

app.route('/:username')
    .get(async (req, res) => {
        
        const found = await User.findOne({username:req.params.username})
        
        console.log(found)
        res.render('allchats.ejs', { username: req.params.username, found})
    })
    .delete((req, res) => {
        User.findOneAndRemove({ username: req.params.username }).then(
            res.redirect('/')
        )
    })
app.route('/pages/new')
    .get(async (req, res) => {
        res.render('newPage.ejs')
    })
    .post(async (req, res) => {
        res.redirect('/username')
    })
app.route('/:username/:chattingwith')
    .get((req, res) => {
        // async function run () {
        //     const user = await User.findOne({username:req.params.username})
        //     const textsReceived = user.textsreceived
        //     const textsSent = user.textssent
        //     textsReceived.forEach(text => text.class = 'their-msg')
        //     textsSent.forEach(text => text.class = 'your-msg')
            

        //         res.render('chat.ejs', {
        //             username: req.params.username,
        //             chattingWith: req.params.chattingwith,
        //             user:user
        //         })
        // }
        res.render('chat.ejs', {
            username: req.params.username,
            chattingWith: req.params.chattingwith,
        })
    })
    .put((req, res) => {
        User.findOneAndUpdate(
            { username: req.params.chattingwith },
            { $push: { textsreceived: { from: req.params.username, message: req.body.message, createdAt: new Date() } } },
            { new: true },
            )
        .then(
        User.findOneAndUpdate(
            { username: req.params.username },
            { $push: { textssent: { to: req.params.chattingwith, message: req.body.message, createdAt: new Date() } } },
            { new: true },
            )
        )
        .then(() => res.redirect(`/${req.params.username}/${req.params.chattingwith}`))
        
        
    })

//listener
app.listen(PORT || 3000, () => console.log('listening...'))
