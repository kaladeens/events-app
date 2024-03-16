//for the class we will make
const mongoose = require('mongoose');
let gen = require('../helpers/randomGen.js');
const moment = require('moment');

/**
     * Model Schema for an event 
     * 
     * @param {string} name - the name of the event
     * @param {date} startDate - the starting date abd time of the event
     * @param {number} duration - the duration of the event 
     * @param {number} categoryList - the list of id references to the categories this event belongs to
     * @param {string} description - the description of the event
     * @param {Boolean} isActive - the active state of the event 
     * @param {string} image - path to image
     * @param {number} capacity - the amount of people that can come to event
     * @param {number} ticketsAvailable - the amount of tickets available
     * 
     */
const eventSchema = new mongoose.Schema({
    eventID: {
        type: String, 
        unique: true,
    },
    name: {
        type:String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        validate: {
            validator : function(num){
                return num >0;
            }
        }
    },
    categoryList: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }],
    description: {type: String},
    isActive: {type: Boolean, default: true},
    image: {
        type: String,
        default: '/party.jpeg'
    },
    capacity: {
        type: Number,
        default: 1000,
        validate: {
            validator: function (capacity){
                return capacity>=20 && capacity <=2000;
            }
        }
    },
    ticketsAvailable: {
        type: Number,
        default: function(){
            return this.capacity;
        },
        validate: {
            validator : function(num){
                return num >=0;
            }
        }
    },
    dateStr : {type: String},
    endStr : {type: String},
    
 
})

module.exports = mongoose.model('Event',eventSchema);
