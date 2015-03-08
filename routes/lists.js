// Import the Lists model for these routes
var ListsModel = require('../models/lists');


/*
 * Lists the infos of a single list
 *
 */
exports.getList = function(req, res) {
    ListsModel.getList(req, res);
}

/*
 * Lists the infos of a single list
 *
 */
exports.updateList = function(req, res) {
    console.log('dad');
    ListsModel.updateList(req, res);
}
