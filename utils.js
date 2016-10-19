var superSecret = require('./config/config').secret;
var jwt = require('jsonwebtoken');
var crudOps = require('./crudOps');

var utils = {
    loginMiddleware(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.cookies.token || req.body.token || req.get('Authentication') || false;
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;

                    //add user info object for access checks in subsequent routes
                    utils.assignUserObject(decoded, req, () => next());

                }
            });

        } else { //no token has been supplied
            
            //check if request wants json
            if(req.query.json){
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
            }

            //if code gotten here it wants standard UI, redirect to login page
            res.redirect('/login');
        }
    },
    assignUserObject(userName, req, callback) {
        crudOps.model.readByCondition('User', {'username' : userName}, (err, person) => {
        	req.userInfo = person;
        	callback();
        });
    }
};


module.exports = utils;