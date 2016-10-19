'use strict';

//API:
//
// Create:     POST: /api/galleries/create?json=true
// Read(one):  GET   /api/galleries/one/:id?json = true
// Read(All):  GET:  /api/galleries/all?json=true
// Update:     POST: /api/galleries/update/:id?json=true 
// Delete:     DELETE: /api/galleries/delete/:id?json=true

var express = require('express');
var router = express.Router();
var crudOps = require('../../crudOps');
var Model = 'Gallery';

/* CREATE */
router.post('/create', function(req, res, next) {

        //prepare values from the form
        let title = req.body.title;		
		let owner  = req.body.owner;
        let created = Date.now();

        let data = {title, owner, created};

        crudOps.model.create(Model, data, (err, picture) => {
        	if (err){ 
				console.log(err);
				res.status(500);
				res.send('server encountered an unexpected error');
				return;	
        	}
        	console.dir(picture);
        	
        	if (req.query.json){
        		return res.json({picture});
        	}
        	res.render('uploader', {message: "Upload Successfull!"});	
        });
});

/* ONE */
router.get('/one/:id', (req,res,next) => {
	let id = req.params.id;

	crudOps.model.read(Model, id, (err, gallery) => {
		if (err){
			console.log(err);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;	
		}

		if (req.query.json){
			return res.json({gallery});
		}
		res.render('edit-picture', {gallery});
	} );
});

/* ALL */
router.get('/all', (req,res,next) => {
	
	crudOps.model.all(Model, (err, galleries) => {
		if (err){
			console.log(err);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;	
		}

		if (req.query.json){
			return res.json({galleries});
		}
		res.render('gallery', {galleries});
	});
});

/* UPDATE */
router.post('/update/:id', (req,res,next) => {
	let id = req.params.id;

	crudOps.model.update(Model, id, req.body, (err, picture) => {
		if (err){
			console.log(err);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;	
		}
		if (req.query.json){
			return res.json({picture});

		}

		res.redirect('/');
	});
});

/* DELETE */
router.delete('/delete/:id',(req,res,next) => {
	let id = req.params.id;
	crudOps.model.delete(Model, id,(error, doc, result) => {
		if (error) {
			console.log(`Logging deletion error of id: ${id}`);
			console.dir(error);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;
		}

		if (req.query.json) {
			res.json({success: true, message: `${Model} with id:${id} was successfully deleted`});
			return;
		}
		res.redirect('/');
	})
});

module.exports = router;
