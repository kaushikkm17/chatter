const mongoose = require('mongoose')
const Schema = mongoose.Schema

const textReceivedSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        timestamps:true
    },
    message: String,
});

module.exports = mongoose.model('TextReceived', textReceivedSchema)
  