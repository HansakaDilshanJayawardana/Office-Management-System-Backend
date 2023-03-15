const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },

    gender: {
        type:String,
        required:true
    },

    nic: {
        type:String,
        required:true
    },

    address: {
        type:String,
        required:true
    },

    contact: {
        type:Number,
        required:true
    },
    
});

const Employee = mongoose.model('Employee',EmployeeSchema);

module.exports = Employee;