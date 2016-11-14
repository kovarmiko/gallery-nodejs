'use strict';
var Picture = require('./models/Picture');
var User = require('./models/User');
var Gallery = require('./models/Gallery');
var Models = {Picture, User, Gallery};
module.exports = {
	writeAPI: (config, clb) => {
		//if idParam exists and condition with this param exists attempto to update
		if (config.idParam && config.condition[config.idParam]){
			//UPDATE
			let key = config.idParam;
			let value = config.condition[config.idParam];
			Models[config.model] && Models[config.model].findOneAndUpdate({ [key] : value }, config.condition, {new: true} , clb);
		} else {
			//CREATE
			Models[config.model] && new Models[config.model](config.condition).save(clb);
		}
		
	},

	readAPI : (config, clb) => {
		Models[config.model] &&	Models[config.model].findOne(config.condition, clb);
	},

	deleteAPI : (config, clb) => {
		Models[config.model] &&	Models[config.model].find(config.condition).remove( clb );
	},

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