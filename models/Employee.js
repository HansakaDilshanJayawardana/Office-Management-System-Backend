const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    
    name: {
        type:String
    },

    gender: {
        type:String
    },

    nic: {
        type:String,
        unique: true
    },

    address: {
        type:String
    },

    contact: {
        type: String,
        unique: true
    },

    email: {
        type: String,
        unique: true
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

const Employee = mongoose.model('Employee',EmployeeSchema);

module.exports = Employee;