'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

const express = require('express');
const logger = require('./middleware/logger');

const app = express();

const { PORT } = require('./config');

app.use(express.static('public'));

app.use(logger);

app.get('/api/notes', (req, res) => {
    const searchTerm = req.query.searchTerm;
    if (searchTerm) {
        let filteredList = data.filter(function(item) {
            return item.title.includes(searchTerm);
        });
        res.json(filteredList);
    } else {
        res.json(data);
    }
});

app.get('/api/notes/:id', (req, res) => {
    
    const id = req.params.id;
    const note = data.find(item => item.id === Number(id));
    if (!note) {
        var err = new Error('Not Found');
        err.status = 404;
        res.status(404).json({ message: 'Not Found' });
    } else {
        res.send(note);
    }
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