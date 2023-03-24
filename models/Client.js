const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    gender: {
        type: String
    },

    nic: {
        type: String,
        unique: true
    },

    address: {
        type: String
    },

    mobile: {
        type: String,
        unique: true
    },

    email: {
        type: String,
        unique: true
    },

    registerDate: {
        type: Date
    },

    createdAt: {
        type: Date
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    modifiedAt: {
        type: Date
    },

    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;