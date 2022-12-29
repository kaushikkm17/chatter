const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    textsreceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TextReceived",
      },
      { timestamps: true },
    ],
});

module.exports = mongoose.model('User', userSchema)
  