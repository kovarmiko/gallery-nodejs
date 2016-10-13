'use strict';
var Picture = require('./models/Picture');
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
			return picture;
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
	}
};