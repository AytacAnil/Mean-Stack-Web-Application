//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const user = require('../models/User');
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
//////////////////////////////////////////////////////////////////////////////////////////////////////myApp/Users
//GET HTTP method to /myApp/Users (to get users)
router.get('/', checkToken, (req,res) =>
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
            user.getAllUsers((err, userList) =>
            {
                if (err || authorizedData["user"]["status"] === "Regular")
                {
                    res.json({success:false, message: 'Failed to load user list. Error:' + err });
                }
                else
                {
                    res.write(JSON.stringify({success: true, users: userList}, null, 2));
                    res.end();
                }
            });
        }
    });
});

//GET HTTP method to /myApp/Users/usernames (to get username list)
router.get('/usernames', checkToken, (req,res) =>
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
            user.getAllUsernames((err, usernameList) =>
            {
                if (err)
                {
                    res.json({success:false, message: 'Failed to load user list. Error:' + err });
                }
                else
                {
                    res.write(JSON.stringify({success: true, usernames: usernameList}, null, 2));
                    res.end();
                }
            });
        }
    });
});

//GET HTTP method
router.get('/search/:word', checkToken, (req,res) =>
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
            user.searchUser(req.params["word"], (err, userList) =>
            {
                if (err)
                {
                    res.json({success:false, message: 'Failed to seach user list. Error:' + err });
                }
                else
                {
                    res.write(JSON.stringify({success: true, userList: userList}, null, 2));
                    res.end();
                }
            });
        }
    });
});

//POST HTTP method to /myApp/Users (to add user)
router.post('/', checkToken, (req,res,next) =>
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
            let newUser = new user(
                {
                    username: req.body.username,
                    password: req.body.password,
                    name    : req.body.name,
                    surname : req.body.surname,
                    gender  : req.body.gender,
                    birthday: req.body.birthday,
                    mail    : req.body.mail,
                    status  : 'Regular'
                });
            user.addUser(newUser, (err, user) =>
            {
                if (err || authorizedData["user"]["status"] === "Regular")
                {
                    res.json({success: false, message: 'Failed to create a new user. Error ' + err});
                }
                else
                {
                    res.json({success: true, newId: user._id});
                }
            });
            console.log('SUCCESS: Connected to protected route');
        }
    });
});


////PUT HTTP method to /myApp/Users. (to update user)
router.put('/:id', checkToken, (req, res, next)=>
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
            let id = req.params.id;
            let updatedUser = new user(
                {
                    username: req.body.username,
                    password: req.body.password,
                    name    : req.body.name,
                    surname : req.body.surname,
                    gender  : req.body.gender,
                    birthday: req.body.birthday,
                    mail    : req.body.mail,
                    _id     : id
                });

            user.updateUser(id, updatedUser, (err, user) =>
            {
                if (err || authorizedData["user"]["status"] === "Regular")
                {
                    res.json({success: false, message: 'Failed to update an user. Error ' + err});
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


//DELETE HTTP method to /myApp. (to delete user)
router.delete('/:id', checkToken, (req,res,next)=>
{
    //verify the JWT token generated for the user
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
            //If token is successfully verified, we can continue
            let id = req.params.id;
            user.deleteUser(id, (err, user) =>
            {
                if (err || authorizedData["user"]["status"] === "Regular")
                {
                    res.json({success:false, message: 'Failed to delete the list. Error: ${err}'})
                }
                else if (user)
                {
                    res.json({success:true, message: "Deleted successfully"});
                }
                else
                {
                    res.json({success:false});
                }
            });
            console.log('SUCCESS: Connected to protected route');
        }
    });
});

module.exports = router;