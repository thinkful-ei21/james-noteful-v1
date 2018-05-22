'use strict';

// Simple In-Memory Database
const data = require('./db/notes');
const simDB = require('./db/simDB');  // <<== add this
const notes = simDB.initialize(data);

console.log('Hello Noteful!');

const express = require('express');
const logger = require('./middleware/logger');

const app = express();

const { PORT } = require('./config');

app.use(express.static('public'));

app.use(logger);

app.use(express.json());

app.get('/api/notes', (req, res, next) => {
    const { searchTerm } = req.query;
  
    notes.filter(searchTerm, (err, list) => {
        if (err) {
            return next(err); // goes to error handler
        }
        res.json(list); // responds with filtered array
    });
});

app.get('/api/notes/:id', (req, res, next) => {
    
    const id = req.params.id;

    notes.find(id, (err, item) => {
        if (err) {
            return next(err);
        } 
        res.json(item);
    });
});

app.put('/api/notes/:id', (req, res, next) => {
    const id = req.params.id;
  
    /***** Never trust users - validate input *****/
    const updateObj = {};
    const updateFields = ['title', 'content'];
  
    updateFields.forEach(field => {
        if (field in req.body) {
            updateObj[field] = req.body[field];
        }
    });
    
    notes.update(id, updateObj, (err, item) => {
        if (err) {
            return next(err);
        }
        if (item) {
            res.json(item);
        } else {
            next();
        }
    });
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});