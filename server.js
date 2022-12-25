const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const PORT = process.env.PORT


app.listen(process.env.PORT || 3000, () => {console.log('listening...')})