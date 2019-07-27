const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    duration: {type: Number},
    username: {type: String, required: true},
    date    : {type: Date,   required: true, default: Date.now },
    ip      : {type: String, required: true},
    browser : {type: String, required: true},
    action  : {type: String, required: true}
});

const SessionList = module.exports = mongoose.model('Sessions', SessionSchema);


module.exports.getAllSessions = (callback) => {
    SessionList.find(callback);
};

module.exports.addSession = (newSession) => {
    newSession.save();
};