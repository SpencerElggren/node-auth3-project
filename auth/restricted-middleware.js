const jwt = require('jsonwebtoken');

const { jwtSecret} = require('../config/secrets');

module.exports = (req,res,next) => {
    const { authorization } = req.headers;

    if (authorization) {
        jwt.verify(authorization, jwtSecret, (err,decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'keiner kann dir sagen welche turen die rightigen sind'});
            } else {
                req.decodedToken = decodedToken;

                next();
            }
        });
    } else {
        res.status(400).json({ message: 'was willst du?'})
    }
};