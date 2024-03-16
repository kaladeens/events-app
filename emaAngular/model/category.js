const mongoose = require('mongoose');
let gen = require('../helpers/randomGen.js');

 /**
      * Model Schema for an event 
      *
      * @param {number} categoryId - the id of the category this event belongs to
      * @param {string} name - the name of the Category
      * @param {string} description - description of the category
      * @param {string} image - path to image 
      */

const categorySchema = new mongoose.Schema({
    categoryID : {
        type: String, 
        unique: true,
        default: "C" + gen.getLetter(2) + '-' + gen.getNumber(4),
    },
    eventList: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    }],
    name: {
        type: String, 
        required: true,
        validate: {
        validator: function(alphanumeric) {
            for (let i = 0; i < alphanumeric.length; i++) {
                let char = alphanumeric[i];
                if (!((char >= '0' && char <= '9') || 
                      (char.toUpperCase() >= 'A' && char.toUpperCase() <= 'Z') || 
                      (char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z'))) {
                    return false;
                }
            }
            return true;
        },
        message: 'The name must be alphanumeric.'},
    },
    description: {
        type: String,
    },
    image: {
        type: String, 
        default: '/party.jpg'
    },
    created: {
        type: Date, 
        default: Date.now}
})

module.exports = mongoose.model('Category',categorySchema);
// module.exports = class Category {
//     /**
//      * Constructor for Categories
//      * 
//      * @param {string} name - the name of the Category
//      * @param {string} description - description of the category
//      * @param {string} image - path to image 
//      */
//     constructor(name, description, image) {
//         this.id = "C" + gen.getLetter(2) + '-' + gen.getNumber(4);
//         this.name = name;
//         this.description = description;
//         this.image = image || '/party.jpg'; // Use default image if not provided
//         this.created = new Date().toLocaleDateString();
//     }

// }