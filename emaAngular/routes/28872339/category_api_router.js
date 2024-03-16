const Event = require('../../model/event.js');
const Count = require('../../model/counts.js')
const Category = require('../../model/category.js')
const mongoose = require('mongoose');

module.exports = {
    addCat: async (req,res) => {
        /**
         * This method will add a category to the database after parsing and cleaning teh data
         */
        let obj = req.body;
        if (obj.image === '') {
            obj.image = undefined;
        }
        let newCategory = new Category(obj);
        try {
            await newCategory.save();
            res.json({ id: newCategory.categoryID });
        } 
        catch (err) {
            res.status(500).json({ status: "error", message: err.message });
        }
    },

    listAll: async (req, res) => {
        /**
         * this method will list all the events in the database
         */
        let categories = await Category.find().populate('eventList').exec();
        res.json(categories);
    },
// old deleteCat function -----
    // deleteCat: async (req, res) => {
    //     let obj = req.body;
    //     let id = obj.categoryId;
    //     let response = await Category.deleteOne({ categoryID: id });
    //     res.json({ acknowledged: response.ok > 0, deletedCount: response.deletedCount });
    // },
    deleteCat: async (req, res) => {
        try {
            let obj = req.body;
            let id = obj.categoryId;
            let category = await Category.findOne({ categoryID: id });
            for (let eventId of category.eventList) {
                let event = await Event.findById(eventId);
                let index = event.categoryList.indexOf(category._id);
                if (index > -1) {
                    event.categoryList.splice(index, 1);
                    await event.save();
                    if (event.categoryList.length === 0) {
                        await Event.deleteOne({ _id: event._id });
                    }
                }
            }
            let response = await Category.deleteOne({ categoryID: id });
            res.json({ acknowledged: response.ok > 0, deletedCount: response.deletedCount });
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message });
        }
    },
    updateCat: async (req, res) => {
        /**
         * this method will update a category in the database
         */
        let obj = req.body;
        let id = obj.categoryId;
        let newName = obj.name;
        let newDescription = obj.description;
    
        try {
            let response = await Category.updateOne({ categoryID: id },
                { $set: { 
                    name: newName, 
                    description: newDescription 
                } 
            });
            await Count.updateOne({operation: 'update'},{$inc: {count: 1}});
            if (response.matchedCount == 0){
                res.json({ status: "ID not found" });
            } else {
                res.json({ status: "Update successful" });
            }
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message });
        }
    },    

    getCategoryStats: async (req, res) => {
        try {
            const totalCategories = await Category.countDocuments();
            const totalEvents = await Event.countDocuments();
            res.json({ 
                totalCategories: totalCategories,
                totalEvents: totalEvents
            });
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message });
        }
    }

    
}