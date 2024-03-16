// initialize express, mongoose, and path
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

// complete initialize express app
const app = express();
const PORT_NUMBER = 8080;

// initialize socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(PORT_NUMBER, () => console.log(`Server started on port ${PORT_NUMBER}`));
//initialise google cloud api's
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();


//import routers
const eventsAPIRouter = require('./routes/sam/events_api_router');
const categoryAPIRouter = require('./routes/28872339/category_api_router');
//import models
const Event = require('./model/event');
const Category = require('./model/category');
const Count = require("./model/counts");

//connect to database
let url = "mongodb://127.0.0.1:27017/ema";
async function connect(){
    let response = await mongoose.connect(url);
    if (response) {
        console.log("connected to database");
        let update = { 
            $setOnInsert: {
                count: 0
            }
        }
        const options = {
            upsert: true,
        };
        await Count.updateOne({operation:"add"},update,options);
        await Count.updateOne({operation:"update"},update,options);
        await Count.updateOne({operation:"delete"},update,options);
        let mockData = {
            categoryID: "C12-1234",
            name: "mockData",
            eventList: []
          }
        await Category.updateOne({categoryID:"C12-1234"},{$set:mockData},options);
    }
    else{
        console.log("failed connecting to database");
        exit(1);
    }
}
connect().catch(error => console.log(error));

//connect backend with front end
app.use("/",express.static(path.join(__dirname, 'dist/assignment')));

// use morgan to log requests to the console
app.use(morgan("tiny"));

// set parsing for url encoded data and json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// endpoints for API operations
// events
app.get("/api/sam/events",eventsAPIRouter.listAll); //get all events data
app.get("/api/sam/events/:id",eventsAPIRouter.getOne); //get one events data

app.get('/api/sam/events-sold',eventsAPIRouter.listSold)
app.post('/api/sam/events',eventsAPIRouter.addEvent); //make and insert an event according data in body
app.delete('/api/sam/events/:id',eventsAPIRouter.deleteEvent); //delete event according data in body
app.put('/api/sam/events',eventsAPIRouter.updateEvent); //update event as accoriding body data
// categories
app.post('/api/28872339/categories',categoryAPIRouter.addCat);//make and insert an event according data in body
app.get('/api/28872339/categories',categoryAPIRouter.listAll); //get all categories data
app.delete('/api/28872339/categories',categoryAPIRouter.deleteCat);//delete event according data in body
app.put('/api/28872339/categories',categoryAPIRouter.updateCat);//update categories as according to body data
//counts
app.get('/api/28872339/categories/stats', categoryAPIRouter.getCategoryStats);

app.get('/api/sam/counts',eventsAPIRouter.getCounts);
app.get('/api/sam/operations',eventsAPIRouter.getOPCounts);

// io socket
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("translate",(data)=>{
        translateTo(data,socket)
    })
});

async function translateTo(data,socket){
    let translation = await translate.translate(data.text,data.to);
    console.log(translation[0])
    socket.emit('translated', translation[0]);

}
