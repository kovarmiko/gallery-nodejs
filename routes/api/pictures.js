'use strict';

//API:
//
// Create:     POST: /api/pictures/create?json=true
// Read(one):  GET   /api/pictures/one/:id?json = true
// Read(All):  GET:  /api/pictures/all?json=true
// Update:     POST: /api/pictures/update/:id?json=true 
// Delete:     DELETE: /api/pictures/delete/:id?json=true

var express = require('express');
var router = express.Router();
var crudOps = require('../../crudOps');
var Model = 'Picture';

var multer = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage }).single('picture');

/* CREATE */
router.post('/create', function(req, res, next) {

	upload(req,res,function(err) {
        if (err) {
        	console.dir(err);
            return res.render('uploader', {message : "Upload failed!"});
        }
        //console.log(req.body);
        //prepare values from the form
        let title = req.body.title;
		let gallery = req.body.gallery;
		let owner  = req.body.owner;
        let url = req.file.filename;
        let uploaded = Date.now();

        let data = {title, gallery, owner, url, uploaded};

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
});

/* ONE */
router.get('/one/:id', (req,res,next) => {
	let id = req.params.id;
	
	crudOps.model.read(Model, id, (err, picture) => {
		if (err){
			console.log(err);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;	
		}

		if (req.query.json){
			return res.json({picture})
		}
		res.render('edit-picture', {picture});
	} );
});

/* ALL */ 
router.get('/all', (req,res,next) => {
	crudOps.model.all(Model, (err, pictures) => {
		if (err){
			console.log(err);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;	
		}

		if (req.query.json){
			return res.json({pictures})
		}
		res.render('gallery', {pictures});
	});
});

/*PICTURES FROM ONE GALLERY*/

router.get('/get-collection/:galleryId', (req, res, next) => {
	let gid = req.params.galleryId;
	crudOps.model.readAllByCondition(Model,{gallery : gid}, crudOps.apiCallback(req, res, '/'))
});

/* UPDATE */
router.post('/update/:id', (req,res,next) => {

	upload(req, res,(err) => {
		if (err){
			console.log('Loggin file upload error')
			console.dir(err);	
		}

		if(req.file && req.file.filename){
			req.body.url = req.file.filename;
		} 

		console.dir(req.body);
		let id = req.params.id;
		crudOps.model.update(
			Model, 
			id, 
			req.body, 
			crudOps.apiCallback(req, res, '/api/pictures/update/' + req.body.id)
		);
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

/* SPECIAL ROUTE FOR CHANING PICTURE IN THE PICTURE ENTITY */
router.post('/changePic/:id', (req,res,next) => {
	upload(req,res,function(err) {
        if (err) {
        	console.dir(err);
            return res.render('uploader', {message : "Upload failed!"});
        }
        const update = {
        	id: req.params.id,
        	url: req.file.filename
        }

        crudOps.model.update(
        	Model,
        	update.id,
        	update, 
        	crudOps.apiCallback( req, res, '/api/pictures/update/' + req.body.id)
        );
    });
});

/* THE FOLLOWING ROUTES ARE HELPERS FOR BUILT-IN UI */

/*Send Picture Upload Form with data from the edited Picture entity*/
router.get('/update/:id', (req,res,next) => {
	let id = req.params.id;
	
	crudOps.model.read(Model, id, (err, picture) => {
		if (err){
			console.log(err);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;	
		}

		if (req.query.json){
			return res.json({pictures})
		}
		res.render('edit-picture', {picture});
	} );
});


/* Send Picture Upload Form */
router.get('/create', function(req, res, next) {
  res.render('uploader', {message : "Picture Form"});
});
module.exports = router;