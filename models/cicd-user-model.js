const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        faceid: { type: Number, required: true },
        email: { type: String},
        mobile: { type: String},
        address: { type: String}
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)