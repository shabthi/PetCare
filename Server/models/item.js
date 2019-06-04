const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let item = new Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  quantity: {
    type: Number
  },
  description: {
    type: String
  },
  reorderLevel: {
    type: Number
  }
},{
    collection: 'items'
});

module.exports = mongoose.model('Item', item);