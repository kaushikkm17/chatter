const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
});


const User = mongoose.model('User', userSchema);


module.exports = User
