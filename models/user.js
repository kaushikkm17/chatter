const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    textssent: [
        {
          to: { type: String, required: true },
          message: { type: String, required: true },
          createdAt: { type: Date, default: () => Date.now() },
        },
    ],
    textsreceived: [
        {
          from: { type: String, required: true },
          message: { type: String, required: true },
          createdAt: { type: Date, default: () => Date.now() },
        },
    ],

});
module.exports = mongoose.model('User', userSchema)



