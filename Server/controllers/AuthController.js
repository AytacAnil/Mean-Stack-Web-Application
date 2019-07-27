//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const user = require('../models/User');
const session = require('../models/Session');
const jwt = require('jsonwebtoken');
const secretKey = require("../secretKey");

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
};

//POST HTTP method to /myApp/login (to login)
router.post('/login', (req,res,next) =>
{
    user.checkLogin(req.body.username, req.body.password, (err, user) => {
        if (err)
        {
            res.json({success: false, message: 'Login failed' + err});
        }
        else
        {
            if (user)
            {
                jwt.sign({user}, secretKey.tokenKey, { expiresIn: '12h' },(err, token) =>
                {
                    if(err) { console.log(err) }
                    res.json({success: true, mockStatus: user.status, token: token});

                    //Add a log for this login
                    let newSession = new session({
                        duration: 0,
                        username: req.body.username,
                        ip      : req.ip,
                        browser : req.headers['user-agent'],
                        action  : "successful login"
                    });
                    session.addSession(newSession);
                });
            }
            else
            {
                res.json({success: false});
            }
        }
    });
});

//POST HTTP method to /myApp/logout (to logout)
router.post('/logout', checkToken, (req,res) =>
{
    jwt.verify(req.token, secretKey.tokenKey, (err, authorizedData) =>
    {
        if(err)
        {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        }
        else
        {
            let duration = Date.now() / 1000 - authorizedData["iat"];

            //Add a log for this logout
            let newSession = new session({
                duration: duration,
                username: authorizedData["user"]["username"],
                ip      : req.ip,
                browser : req.headers['user-agent'],
                action  : "logout"
            });
            session.addSession(newSession);
            res.json({success: true});
        }
    });
});
module.exports = router;

