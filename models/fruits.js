const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
    text: { type: String, required: true },
    readyToEat { type: Boolean, require: true }
},{
    timestamps: true
})

const Fruit = mongoose.model('Fruit', fruitSchema)

module.exports = Fruit

