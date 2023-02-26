const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    username: String,
    message: String,
    page: { type: Schema.Types.ObjectId, ref: 'Page' },
  });
  
const Message = mongoose.model('Message', messageSchema);
module.exports = Message