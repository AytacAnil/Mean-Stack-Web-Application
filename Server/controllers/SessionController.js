//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
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

//////////////////////////////////////////////////////////////////////////////////////////////////////myApp/sessions
//GET HTTP method to /myApp/sessions (to get session list)
router.get('', checkToken, (req,res) =>
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
            session.getAllSessions((err, sessionList) =>
            {
                if (err || authorizedData["user"]["status"] === "Regular")
                {
                    res.json({success:false, message: 'Failed to load session list. Error:' + err });
                }
                else
                {
                    res.write(JSON.stringify({success: true, sessions: sessionList}, null, 2));
                    res.end();
                }
            });
        }
    });
});

module.exports = router;