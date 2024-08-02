require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const PORT = 3000
const Fruit = require('./models/fruit')
const logger = require('morgan')
const methodOverride = require('method-override')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('tiny'))
app.use(methodOverride('_method'))
app.use('/assets', express.static('public'))

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('MongoDB better get it togetha')
})

mongoose.connection.on('error', () => {
    console.error('MongoDB is messed up')
})

// CREATE

app.post('/fruits', async (req, res) => {
    req.body.readyToEat === 'on' || req.body.readyToEat === true?
    req.body.readyToEat = true :
    req.body.readyToEat = false
    try {
        const createdFruit = await Fruit.create(req.body)
        res.redirect(`/fruits/${createdFruit._id}`)
    }   catch (error) {
        res.status(400).json({ msg: error.message })
    }
})
// new
app.get('/fruits/new', (req, res)=> {
    res.render('new.ejs')
})

// index

app.get('/fruits', async (req, res) => {
    try {
        const foundFruits = await Fruit.find({})
        res.render('index.ejs', {
            fruits: foundFruits
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})