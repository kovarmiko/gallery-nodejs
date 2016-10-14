var express = require('express');
var router = express.Router();
var crudOps = require('../../crudOps');

router.get('/all', function(req, res, next) {
	crudOps.user.all((err, users)=>{
		if(err){
			res.status(500);
			res.json({error: "Internal Server Error"});
			return;
		}
		if(req.query.json){
			res.json(users);
			return;
		}
		res.render('user-list', {users})

		
	})
});

/*router.post('/register', function(req, res, next) {
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
});*/

module.exports = router;