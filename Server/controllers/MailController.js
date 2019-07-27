//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const message = require('../models/Message');
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

//////////////////////////////////////////////////////////////////////////////////////////////////////myApp/Mails
//GET HTTP method to /myApp/Mails/inbox (to get inbox)
router.get('/inbox', checkToken, (req,res) =>
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
            message.getInbox(authorizedData["user"]["username"],(err, messageList) =>
            {
                if (err)
                {
                    res.json({success:false, message: 'Failed to load message list. Error:' + err });
                }
                else
                {
                    res.write(JSON.stringify({success: true, messages: messageList}, null, 2));
                    res.end();
                }
            });
        }
    });
});

//GET HTTP method to /myApp/Mails/outbox (to get outbox)
router.get('/outbox', checkToken, (req,res) =>
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
            message.getOutbox(authorizedData["user"]["username"], (err, messageList) =>
            {
                if (err)
                {
                    res.json({success:false, message: 'Failed to load message list. Error:' + err });
                }
                else
                {
                    res.write(JSON.stringify({success: true, messages: messageList}, null, 2));
                    res.end();
                }
            });
        }
    });
});

//POST HTTP method to /myApp/Mails (to add message)
router.post('', checkToken, (req,res,next) =>
{
    jwt.verify(req.token, secretKey.tokenKey, (err, authorizedData) =>
    {
        if(err)
        {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else
        {
            //If token is successfully verified, we can send the authorized data
            let newMessage = new message(
                {
                    from: authorizedData["user"]["username"],
                    to: req.body.to,
                    messageText: req.body.messageText
                });
            message.sendMessage(newMessage, (err, message) =>
            {
                if (err)
                {
                    res.json({success: false, message: 'Failed to send message. Error ' + err});
                }
                else
                {
                    res.json({success: true});
                }
            });
            console.log('SUCCESS: Connected to protected route');
        }
    });
});

module.exports = router;