var superSecret = require('./config/config').secret;
var jwt = require('jsonwebtoken');
var crudOps = require('./crudOps');

var utils = {
    loginMiddleware: function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.cookies.token || false;
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    console.log('decoded');
                    console.log(decoded);

                    //add user info object for access checks in subsequent routes
                    utils.assignUserObject(decoded, req, () => next());

                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    },
    assignUserObject: function (userName, req, callback) {

        crudOps.user.findByUsername(userName, (err, person)=>{
        	req.userInfo = person;
        	callback();
        });

    },
};

module.exports = utils;