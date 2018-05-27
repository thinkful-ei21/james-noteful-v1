/* global $ */
'use strict';

const api = {

    search: function (query) {
        return $.ajax({
            type: 'GET',
            url: '/api/notes/',
            dataType: 'json',
            data: query,
        });
    },

    details: function (id) {
        return $.ajax({
            type: 'GET',
            dataType: 'json',
            url: `/api/notes/${id}`
        });
    },

    update: function (id, obj) {
        return $.ajax({
            type: 'PUT',
            url: `/api/notes/${id}`,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(obj),
        });
    },

    create: function (obj) {
        return $.ajax({
            type: 'POST',
            url: '/api/notes',
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            data: JSON.stringify(obj),
        });
    },

    remove: function (id) {
        return $.ajax({
            type: 'DELETE',
            url: `/api/notes/${id}`,
            dataType: 'json',
        });
    }

};

// // test get all
// api.search({})
//     .then(response => {
//         console.log(response);
//     });

// // test get all with search term
// api.search({searchTerm: 'cats'})
//     .then(response => {
//         console.log(response);
//     });

// // test details of one note
// api.details(1005)
//     .then(response => {
//         console.log(response);
//     });

// // test updating one note
// api.details(1001)
//     .then(response => {
//         console.log(response);
//     });

// api.update(1001, {title: 'updated title', content: 'updated content'})
//     .then(response => {
//         console.log(response);
//     });

// // test creating new item
// api.create({title: 'new note title', content: 'new note content text'})
//     .then(response => {
//         console.log(response);
//     });

// //tests removing an item,
// // will return undefined the first time and 404 after unless you restart the server
// api.remove(1004)
//     .then(response => {
//         console.log(response);
//     });