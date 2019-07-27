const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//To enable Cross Origin interaction
const cors = require('cors');

//Database address
const config = require('./database');

//To create a default admin
const user = require('./models/User');

//Controllers
const mailController = require('./controllers/MailController');
const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');
const authController = require('./controllers/AuthController');

//Connect to database
mongoose.connect(config.database, { useNewUrlParser: true });


///////////Create default admin
let newUser = new user(
    {
        username: 'admin',
        password: '1357',
        name    : 'a name',
        surname : 'a surname',
        gender  : 'a gender',
        birthday: 'some date',
        mail    : 'an e-mail',
        status  : 'Admin'
    });

user.addUser(newUser, (err, user) =>
{
    if (err)
    {
        console.log("Couldn't create default admin, might be already created.")
    }
    else
    {
        console.log("Default admin created.")
    }
});///////////Create default admin end


//Initialize app variable
const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routing all HTTP requests to controller
app.use('/myApp/Users', userController);
app.use('/myApp/Mails', mailController);
app.use('/myApp/Sessions', sessionController);
app.use('/myApp', authController);

//Listen to port 3000
app.listen(port, () => {
    console.log('Listening at port 3000');
});
