const Event = require('../../model/event.js');
const Count = require('../../model/counts.js')
const Category = require('../../model/category.js')
const gen = require('../../helpers/randomGen.js')
const mongoose = require('mongoose');
const moment = require('moment');

module.exports = {
    getOne : async (req,res) => {
        try{
            let id = req.params.id;
            let event = await Event.findOne({eventID:id}).populate('categoryList').exec();
            res.status(200).json(event);
        }catch(err){
            res.status(400).json(err.message)
        }
    },
    addEvent: async (req,res) => {
        /**
         * This method will add an event to the database after parsing and cleaning the data
         */
        try{
            let obj = req.body;
            
            obj.categoryList = obj.categoryList.split(',');
            let new_list = obj.categoryList;
    
            obj.categoryList=await [];
            let newEvent = new Event(obj);

            newEvent.dateStr = new Date(newEvent.date).toLocaleString();
            let endDate = moment(newEvent.date).add(newEvent.duration, 'm');
            newEvent.endStr = endDate.toDate().toLocaleString();

            newEvent.eventID =  "E"+gen.getLetter(2)+'-'+ gen.getNumber(4);
            for (let i = 0; i < new_list.length; i++) {
                var now = await Category.findOne({categoryID: new_list[i]}).exec();
                if (now== null){
                    res.status(400).json({status: "error", message: "Category not found"});
                    return;
                }
                    await now.eventList.push(newEvent._id);
                    await now.save();
                await newEvent.categoryList.push(now._id);
                await newEvent.save();
            }
            
            await Count.updateOne({operation: 'add'},{$inc: {count: 1}});
            res.json({status:"200",eventID: newEvent.eventID, message: "event added successfully"});
        }catch(err){
            console.log(err)
            res.status(400).json({status: "400", message: err.message});
         }
    },
    listAll: async (req,res) => {
        /**
         * This method will list all the events in the database
         */
        let events = await Event.find().populate('categoryList').exec();
        res.json(events);
    },
    deleteEvent: async (req,res) => {
        /**
         * This method will delete an event from the database
         */
        try {
            let id = req.params.id;
            let event = await Event.findOne({eventID: id});
            await Count.updateOne({operation: 'delete'},{$inc: {count: 1}});
            for (let i = 0; i < event.categoryList.length; i++) {
                var cat = await Category.findById(event.categoryList[i]).exec();
                for (let j = 0; j < cat.eventList.length; j++) {
                    if(cat.eventList[j].toHexString() === event._id.toHexString()){
                        await cat.eventList.splice(j,1);
                        await cat.save();
                        break;
                    }
                }
            }   
            let response = await Event.deleteOne({eventID: id})
            res.json(response)
        }catch(err){
            console.log(err)
            res.status(400).json({status: "400", message: err.message});
        }
        
        
    },
    updateEvent: async (req,res) => {
        /**
         * This method will update an event in the database
         */
        let obj = req.body;
        let id = obj.eventID;
        let newName = obj.name;
        let capN = obj.capacity;
        try{
        let response = await Event.updateOne({eventID: id},
            {$set: {
                name: newName,
                capacity: capN
            }
        },{runValidators: true});   

        if(response.matchedCount==0){
            res.json({status: "not found"});

        }
        else{
            await Count.updateOne({operation: 'update'},{$inc: {count: 1}});

            res.json({status: "updated successfully"})
        }
    }catch(err){
        res.status(404).json({status: "error", message: err.message});
    }
       
    },

    listSold: async (req,res) => {  
        /**
         * This method will list all the events that are sold out
         */
        let events = await Event.find({ticketsAvailable: 0}).populate('categoryList').exec();
        res.json(events);
    },
    getOPCounts: async (req,res) => {
        /**
         * This method will get the counts of operations
         */
        let add = await Count.findOne({operation: 'add'}).exec();
        let update = await Count.findOne({operation: 'update'}).exec();
        let del = await Count.findOne({operation: 'delete'}).exec();

        res.json({add: add.count, update: update.count, delete: del.count});
    },
    getCounts: async (req,res) => {
        /**
         * This method will get the counts of events and categories
         */
        let events = await Event.countDocuments({}).exec();
        let categories = await Category.countDocuments({}).exec();
        res.json({events: events, categories: categories});
    }
}