// Imports the mongo lib
var mongojs = require('mongojs');
var ObjectID = require('mongodb').ObjectID;

/*
 * Defines the List Model
 *
 */
var ListsModel = function() {
    this.databaseUrl = 'localhost/babby';
    this.collections = ["lists"];
    
    this.db = mongojs(this.databaseUrl, this.collections);
};


/*
 * Gets the information from a single list
 *
 */
ListsModel.prototype.getList = function(req, res) {
    var hardwareID = req.params.id;

    this.db.lists.findOne({hardwareID: hardwareID}, function(err, list) {
        res.jsonp(list);
    });
};

/*
 * Update a list
 *
 */
ListsModel.prototype.updateList = function(req, res) {

    var hardwareID = req.params.id;
    var itemID = req.params.itemid;
    var saveData = {};

console.log(hardwareID);
console.log(itemID);
console.log(req.body);

    // Update the pilot's first name
    if(req.body) {
        console.log('in here');
        var saveData = { $set: {'items.$.status': {value: req.body.value, priority: req.body.priority}}};
    }

console.log(saveData);

    /*// Update the pilot's nickname
    if(req.body.nickname) {
        saveData.$set.nickname = req.body.nickname;
    }

    // Update the pilot's last name
    if(req.body.lastName) {
        saveData.$set.lastName = req.body.lastName;
    }

    // Update the pilot's home airport
    if(req.body.homeAirport) {
        saveData.$set.homeAirport = req.body.homeAirport;
    }

    // Update the pilot's current airport
    if(req.body.currentAirport) {
        saveData.$set.currentAirport = req.body.currentAirport;
    }

    // Set the pilot's flight hours
    if(req.body.flightHours) {
        saveData.$set.flightHours = req.body.flightHours;
    }

    // Add to the the pilot's flight hours
    if(req.body.addFlightHours) {
        saveData.$inc.flightHours = parseInt(req.body.addFlightHours);
    }

    // Update the pilot's flight hours
    if(req.body.online) {
        saveData.$set.online = req.body.online;
    }*/

    this.db.lists.findAndModify({
        query: {hardwareID: hardwareID, 'items._id': ObjectID(itemID)},
        update: saveData,
        new: true
    }, function(err, list, lastErrorObject) {
        console.log(list);
        console.log(err);
        res.jsonp(list);
    });
};

// Reutrn this to Express
module.exports = new ListsModel();
