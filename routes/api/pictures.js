
var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('picture');

/* Send Upload Form */
/* GET home page. */
router.get('/upload', function(req, res, next) {
  res.render('uploader', {});
});

/* Process uploded Picture */
router.post('/upload', function(req, res, next) {
	console.log('loggin body');
	console.dir(req.body); 

	upload(req,res,function(err) {
        if(err) {
        	console.dir(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});



module.exports = router;