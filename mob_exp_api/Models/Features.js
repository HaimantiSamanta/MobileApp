const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const featureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    camera: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('feature', featureSchema, 'features');

