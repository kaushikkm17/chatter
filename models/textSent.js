const mongoose = require('mongoose')
const Schema = mongoose.Schema

const textSentSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    message: String,
});

module.exports = mongoose.model('TextSent', textSentSchema)
  