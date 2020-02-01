// libraries
const express = require('express');


// other files
const db = require('./data/hubs-model.js');


// global objects
const server = express();

// middleware
server.use(express.json())


// what happens on a GET request to /
// request handler

server.get('/', (req, res) => {
    // What is the datatype? -> Express detects this for us
    
    // What is my status code? -> Sometimes need to send back a status code 
    // but most of the time express takes care of this for us.
    
    // What am I sending back? -> timestamp
    res.send('Hello World');
}) 


// GET /now
// sends back a timestamp
server.get('/now', (req, res) => {
    const now = new Date().toString();
    res.send(now);
})



// GET /hubs
server.get('/hubs', (req, res) => {
    db.find()
        .then(hubs => {
            console.log('hubs', hubs)
            res.json(hubs)
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })
})

// POST /hubs
server.post('/hubs', (req, res) => {
    const newHub = req.body;
    console.log('new hub', newHub)
    // could add a step here to validate the hub
    db.add(newHub)
        .then(hub => {
            res.status(201).json(hub)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to create new hub'
            })
        })
})

// DELETE  /hubs/:id
server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params; // or can also be written   const id = req.params.id;

    db.remove(id)
        .then(deletedHub => {
            if(deletedHub) {
                res.json(deletedHub)
            } else {
                res.status(404).json({
                    message: 'invalid hub id'
                })
            }
            
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to delete hub'
            })
        })
})



// PUT /hubs/:id
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.json(updated)
            } else {
                res.status(404).json({
                    message: 'invalid hub id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to update hub'
            })
        })
})


server.get('/hubs/:id', (req, res) => {
    const { id } = req.params;
    
    db.findById(id)
        .then(byId => {
            if (byId) {
                res.json(byId)
            } else {
                res.status(404).json({
                    message: 'invalid hub id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to get hub'
            })
        })
})

// should be last step
server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});