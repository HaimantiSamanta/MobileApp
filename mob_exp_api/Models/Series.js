const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    feature_id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('serie', serieSchema, 'series');

