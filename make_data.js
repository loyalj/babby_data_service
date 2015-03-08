// Imports the mongo lib
var mongojs = require('mongojs');
var ObjectID = require('mongodb').ObjectID;

databaseUrl = "localhost/babby";
collections = ['lists'];
db = mongojs(databaseUrl, collections);

db.lists.insert({
    hardwareID: 'fogden',
    items: [
        {
            _id: ObjectID(),
            name: 'Formula', 
            lastUpdated: '2015-02-03', 
            status: 
            { 
                value: false,
                priority: true
            }
        },
        {
            _id: ObjectID(),
            name: 'Diapers', 
            lastUpdated: '2015-08-01', 
            status: 
            { 
                value: false,
                priority: false
            }
        },
        {
            _id: ObjectID(),
            name: 'Formula', 
            lastUpdated: '2015-02-03', 
            status: 
            { 
                value: true,
                priority: true
            }
        }
    ]
});
