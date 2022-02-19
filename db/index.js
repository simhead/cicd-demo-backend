const mongoose = require('mongoose')

// mongodb+srv://simhead:112245@cluster0.2wv2f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb://127.0.0.1:27017/soynet
mongoose
    .connect('mongodb+srv://simhead:112245@cluster0.2wv2f.mongodb.net/cicd-demo?retryWrites=true&w=majority'
        , { useNewUrlParser: true, useUnifiedTopology: true }, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db