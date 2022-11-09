const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandtypesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('brandtype', brandtypesSchema, 'brandtypes');