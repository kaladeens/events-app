const mongoose = require('mongoose');

/**
 * This schema will store the count of the number of events in the database
 * @param {string} operation - the kind of operation this will count
 * @param {Number} count - the count of this operation
 * 
 */
const countSchema = new mongoose.Schema({
    operation: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Count',countSchema);