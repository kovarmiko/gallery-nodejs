'use strict';
var express = require('express');
var router = express.Router();
var crudOps = require('../../crudOps');

var multer = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('picture');

/* Send Upload Form */
router.get('/create', function(req, res, next) {
  res.render('uploader', {message : "Picture Form"});
});

/* Process uploded Picture */
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
        
        //create picture
        crudOps.picture.create(title, gallery, owner, url, uploaded, (err, picture) => {
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

router.get('/all', (req,res,next) => {
	crudOps.picture.all((err, pictures) => {
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

router.get('/update/:id', (req,res,next) => {
	let id = req.params.id;
	
	
	crudOps.picture.findById(id, (err, picture) => {
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
	});
});

router.post('/update/:id', (req,res,next) => {
	console.dir(req.body);
	crudOps.picture.update(req.params.id, req.body, (err, picture) => {
		if (err){
			console.log(err);
			res.status(500);
			res.send('server encountered an unexpected error');
			return;	
		}
		if (req.query.json){
			return res.json({picture});

		}

		res.redirect('/api/pictures/update/' + req.body.id)
	});
});

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

        crudOps.picture.update(update.id, update, (err, picture) => {
	        if (err){
				console.log(err);
				res.status(500);
				res.send('server encountered an unexpected error');
				return;	
			}
			if (req.query.json){
				return res.json({pictures})
			}
        	res.redirect('/api/pictures/update/' + req.body.id)
        });
    });
});
module.exports = router;