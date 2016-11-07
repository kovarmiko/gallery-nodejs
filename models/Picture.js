// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var pictureSchema = new Schema({
	/* '_id' parameter is supplied OTB by MongoDb, the unique primary key*/
	title: { type: String, required: true, unique: true },
	gallery: { type: String, required: true},
	owner : { type: String, required: true},
	url : { type: String, required: true},
	uploaded : { type: String, required: true}
});

// the schema is useless so far
// we need to create a model using it
var Picture = mongoose.model('Picture', pictureSchema);

// make this available to our users in our Node applications
module.exports = Picture;
