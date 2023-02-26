const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    name: String,
  });

const Page = mongoose.model('Page', pageSchema);
module.exports = Page
