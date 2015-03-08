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


    // Update the pilot's first name
    if(req.body) {
        console.log('in here');
        var saveData = { $set: {'items.$.status': {value: req.body.value, priority: req.body.priority}}};
    }

    this.db.lists.findAndModify({
        query: {hardwareID: hardwareID, 'items._id': ObjectID(itemID)},
        update: saveData,
        new: true
    }, function(err, list, lastErrorObject) {
        console.log(err);
        res.jsonp(list);
    });
};

ListsModel.prototype.updateListMQTT = function(itemID, statusVal) {

    var hardwareID = 'fodgen';
    var value = 0;
    var priority = 0;
    var itemMap = ["54fbc2a3266862c559554d5f"];

    
    if(statusVal >= 1 ) {
        value = true;
        priority = true;    
    }
    else {
        value = false;
        priority = false;
    }

    var saveData = { $set: {'items.$.status': {value: value, priority: priority}}};
    
    this.db.lists.findAndModify({
        query: {hardwareID: hardwareID, 'items._id': ObjectID('54fbc2a3266862c559554d5f')},
        update: saveData,
        new: true
    }, function(err, list, lastErrorObject) {
        console.log(err);
        console.log(list);
    });
};

// Reutrn this to Express
module.exports = new ListsModel();
