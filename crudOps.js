'use strict';
var Picture = require('./models/Picture');
var User = require('./models/User');
module.exports = {
	picture : {
		create : (title, gallery, owner, url, uploaded, clb) => {
			let picture = new Picture({
				title,
				gallery,
				owner,
				url,
				uploaded
			}).save(clb);

		},
		all : (clb) => {
			Picture.find(clb)
		},
		findById :(id, clb) => {
			Picture.findOne( {'_id' : id }, clb);
		},
		update : (id, data, clb) => {
				Picture.findOneAndUpdate({'_id' : id}, data, {} , clb);
		}
	},
	user : {
		create: (username, password, clb)=>{
			let user = new User({
				username,
				password
			}).save(clb);
		},
		all : (clb) => {
			User.find(clb)
		},
		findById :(id, clb) => {
			User.findOne( { '_id' : id }, clb);
		},
		findByUsername :(id, clb) => {
			User.findOne( {'username' : id }, clb);
		},
		update : (id, data, clb) => {
				User.findOneAndUpdate({'_id' : id}, data, {} , clb);
		}
	}
};