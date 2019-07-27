const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    name    : {type: String, required: true },
    surname : {type: String, required: true },
    gender  : {type: String, required: true },
    birthday: {type: String, required: true },
    mail    : {type: String, required: true },
    status  : {type: String, required: true, enum: ['Admin', 'Regular']}
});

const UserList = module.exports = mongoose.model('Users', UserSchema);

//Returns all the users
module.exports.getAllUsers = (callback) => {
    UserList.find(callback).select({"password": 0});
};

//Returns all the usernames
module.exports.getAllUsernames = (callback) => {
    UserList.find(callback).select({"username": 1, "_id": 0});
};

//newList.save is used to insert the document into MongoDB
module.exports.addUser = (newUser, callback) => {
    newUser.save(callback);
};

module.exports.updateUser = (id, updatedUser, callback) => {
    let query = {_id: id};
    UserList.findOneAndUpdate(query, updatedUser, callback);
};

module.exports.deleteUser = (id, callback) => {
    let query = {_id: id};
    UserList.deleteOne(query, callback);
};

module.exports.checkLogin = (username, password, callback) => {
    let query = {username: username, password: password};
    UserList.findOne(query, callback).select({"password": 0});
};

module.exports.findUser = (username, callback) => {
    let query = {username: username};
    UserList.findOne(query, callback);
};

module.exports.searchUser = (word, callback) => {
    UserList.find({ username: {$regex: word, $options:'i'} }, callback).select({"username": 1, "_id": 0});
};