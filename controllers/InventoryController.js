const Inventory = require('../models/Inventory');
const { Router } = require("express"); // import router from express

const router = Router();

//Add Inventory
router.post("/add", async (req, res) => {
    const { name, quantity, price, description } = req.body;

    //Validation
    if(!name  || !quantity || !price || !description) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all fields'
        });
    }

    //check if inventory already exists
    const inventory = await Inventory.findOne({ name });

    //if inventory exists
    if (inventory) {
        return res.status(400).json({
            success: false,
            message: 'Inventory already exists with this name'
        });
    }

    //create inventory
    const newInventory = new Inventory({
        name,
        quantity,
        price, 
        description
    });

    //save inventory
    await newInventory.save();

    if (newInventory) {
        res.status(201).json({
            success: true,
            data: newInventory
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Inventory not added'
        });
        throw new Error('Inventory not added');
    }
});

//Retrieve all the inventory
router.get("/get", async (req, res) => {
    const inventory = await Inventory.find();

    if (inventory) {
        res.status(200).json({
            success: true,
            data: inventory
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No inventories found'
        });
        throw new Error('No research inventories found');
    }
});

//Update inventory
router.put("/update/:id", async (req, res) => {
    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
        return res.status(400).json({
            success: false,
            message: 'No inventories found'
        });
    } else {
        const { name, quantity, price, description } = req.body;

        inventory.name = name;
        inventory.quantity = quantity;
        inventory.price = price;
        inventory.description= description;

        await inventory.save();

        res.status(200).json({
            success: true,
            data: inventory
        });
    }
});

//Delete inventory by id
router.delete("/delete/:id", async (req, res)  => {
    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await inventory.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Inventory deleted successfully'
        });
    }
});

module.exports = router;