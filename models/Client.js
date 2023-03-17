const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    nic: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String,
        required: true
    },

    mobile: {
        type: Number,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    profilePicUrl: {
        type: String,
        default: '',
    },

    registerDate: {
        type: Date,
        default: Date.now,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;