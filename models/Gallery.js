// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gallerSchema = new Schema({
  title: {type: String, required: true},
  owner : {type: String, required: true},
  created : {type: String, required: true}
});

// the schema is useless so far
// we need to create a model using it
var Gallery = mongoose.model('Gallery', gallerSchema);

// make this available to our users in our Node applications
module.exports = Gallery;