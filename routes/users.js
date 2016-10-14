var express = require('express');
var router = express.Router();
var crudOps = require('../crudOps');

router.get('/register', function(req, res, next) {
	res.render('register', {});
});

router.post('/login', function(req, res, next) {
	crudOps.create.user(req.body.username, req.body.password, (err, user)=>{
		if(err){
			res.status(500);
			res.json({error: "Internal Server Error"});
		}
		if(req.query.json){
			res.json(user);
			return;
		}
		res.render('register',{message: 'User created!'});
	})

	res.render('register', {});
});

module.exports = router;
