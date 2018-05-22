'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

const express = require('express');

const app = express();

const { PORT } = require('./config');

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
    
    const id = req.params.id;
    const note = data.find(item => item.id === Number(id));
    res.send(note);
});

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

// const searchTerm = req.query.searchTerm;
// if (searchTerm) {
//   let filteredList = data.filter(function(item) {
//     return item.title.includes(searchTerm);
//   });
//   res.json(filteredList);
// } else {
//   res.json(data);
// }

app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});