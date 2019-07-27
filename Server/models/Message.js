const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    date       : {type: Date,   required: true, default: Date.now },
    from       : {type: String, required: true },
    to         : {type: String, required: true },
    messageText: {type: String, required: true },
});

const MessageList = module.exports = mongoose.model('Messages', MessageSchema);

//Returns inbox messages
module.exports.getInbox = (username, callback) => {
    let query = {to: username};
    MessageList.find(query, callback);
};

//Returns outbox messages
module.exports.getOutbox = (username, callback) => {
    let query = {from: username};
    MessageList.find(query, callback);
};

module.exports.sendMessage = (newMessage, callback) => {
    newMessage.save(callback);
};