var express = require('express');
var router = express.Router();
var cors = require('cors');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
//var monk = require('monk');
//var db = monk('mongodb://josh:<password@ds031903.mongolab.com:31903/server');
router.use(cors());



//var Thing = mongoose.model("Thing", Schema);

mongoose.connect("mongodb://josh:password@ds031903.mongolab.com:31903/server", function(error) {
	if (error) console.error(error);
	else console.log("mongo connected");
});


var db = mongoose.connection;

var Schema = new mongoose.Schema({
	
}, {strict: false});

	// Store song documents in a collection called "songs"
var Thing = mongoose.model('thing', Schema);

router.post('/', function(req, res, next) {
	console.log(req.body);
	var item = new Thing(req.body);
	item.save(function(err) {
		res.json(200, item._id);
	});
	console.log(item);
});

router.get('/find/:id', function(req, res) {
	Thing.findById(req.params.id, function(err, stuff) {
		res.json(200, stuff);
	});
});

module.exports = router;
