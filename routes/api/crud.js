'use strict';
var express = require('express');
var router = express.Router();
var crudOps = require('../../crudOps');


/* POST */
router.post('/crud',(req,res,next) => {
	//parse 'the single' config
	let config = JSON.parse(req.body.config);

	//dispatch to the correct handler based on 'type'
	switch(config.type){
		case 'read': crudOps.readAPI(config, standardResponse.bind(null, req, res)); break;
		case 'write': crudOps.writeAPI(config, standardResponse.bind(null, req, res)); break;
		case 'delete' : crudOps.deleteAPI(config, standardResponse.bind(null, req, res)); break;
	}
});

function standardResponse(req, res, err, model){
	//of error end here and log error
	if (err){
		console.log(err);
		res.status(500);
		res.send('server encountered an unexpected error');
		return;	
	}
	//otherwise send model
	return res.json({model});
}

module.exports = router;