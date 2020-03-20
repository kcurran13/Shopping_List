const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let itemSchema = new Schema({
    name: String,
    quantity: Number,
    category: String,
    list: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;