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
    }
});

const Inventory = mongoose.model('Inventory',InventorySchema);

module.exports = Inventory;