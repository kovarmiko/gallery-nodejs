'use strict';
var Picture = require('./models/Picture');
var User = require('./models/User');
var Gallery = require('./models/Gallery');
var Models = {Picture, User, Gallery};
module.exports = {
	model : {
		create: (model, data, clb) => {
			new Models[model](data).save(clb);
		},
		read : (model, id, clb) => {
			Models[model].findOne({'_id' : id }, clb);
		},
		readByCondition : (model, condition, clb) => {
			Models[model].findOne(condition, clb);
		},
		readAllByCondition : (model, condition, clb) => {
			Models[model].find(condition, clb);
		},
		update:(model, id, data, clb) => {
			Models[model].findOneAndUpdate({'_id' : id}, data, {new: true} , clb);
		},
		delete : (model, id, clb) => {
			Models[model].find({ '_id': id }).remove( clb ); //cleb parameters (error, doc, result)
		},
		all : (model, clb) => {
			Models[model].find(clb)
		},
	},
	apiCallback: (req, res, redirect) => {
		return (err, model) => {
			if (err){
			console.log(err);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;	
			}
			if (req.query.json){
				return res.json({model});

			}
			if (redirect){
				res.redirect(redirect);
			}
		}		
	}
};