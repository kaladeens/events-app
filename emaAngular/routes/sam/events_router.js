let express = require('express');
let router = express.Router(); 

/**
 * This router method will serve the add_event.htmls file which acts to let us recieve input from the user.
 */
router.get('/sam/events/add',function (req,res){
    res.sendFile("./views/sam/add_event.html",{root: "./"})
});

/**
 * This method will get the data from the form in the get method and then process and add it to the database
 */
router.post('/sam/events/add',async (req,res)=>{
    let obj = req.body;
    console.log(obj)
    let data = JSON.stringify(obj);
    try{
        await fetch('http://localhost:8080/api/sam/event-add', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: data,
        });
        res.redirect('/sam/events/list');
    }
    catch(err){
        res.redirect('/error');
    }
});

/** 
 * This method will delete an event as according to the parameter it receives in its url
 */
router.get('/sam/events/del', async (req,res)=>{
    await fetch('http://localhost:8080/api/sam/events',{
        method: "GET"
    }).then((response) => {return response.json()})
    .then(DATA => {
        res.render("sam/delete",{db: DATA, type: 'List Events',moment: moments,gen:gens})
    });
    
})
router.get('/sam/events/delete',async (req,res)=>{
    let deleteID=req.query.id;
    let dict = {eventID: deleteID}
    dict = await JSON.stringify(dict)
    try{
        await fetch('http://localhost:8080/api/sam/event-delete',{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: dict,
        })
        res.redirect('/sam/events/list')
        
    }catch(err){
        console.log(err)
        res.redirect('/error');
    }
})
