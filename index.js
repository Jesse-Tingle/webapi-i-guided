// libraries
const express = require('express');


// other files
const db = require('./data/hubs-model.js');


// global objects
const server = express();


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


// should be last step
server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});