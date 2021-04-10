const mongoose = require('mongoose')
const mongo = process.env.mongodburl

mongoose

    .connect(mongo, { useUnifiedTopology: true , useNewUrlParser: true ,useCreateIndex: true  })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db