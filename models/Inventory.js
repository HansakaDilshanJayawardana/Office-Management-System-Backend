const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },

    quantity: {
        type:String,
        required:true
    },

    price: {
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    },

    createdAt: {//date the file was created
        type: Date
    },

});

const Inventory = mongoose.model('Inventory',InventorySchema);

module.exports = Inventory;