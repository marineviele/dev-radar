const mongoose = require('mongoose');

//get from mongoDB
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

module.exports = PointSchema;