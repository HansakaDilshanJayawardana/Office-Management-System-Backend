const Client = require('../models/Client');
const { Router } = require("express");
// const multer = require("multer");
const router = Router();
// const upload = multer({ dest: "uploads/client_pic" });
const User = require('../models/User');

// Endpoint for adding a new client
router.post('/add', async (req, res) => {
  try {
    // Validate the request body
    const { firstName, lastName, gender, nic, address, mobile, email, username } = req.body;
    if (!firstName || !lastName || !gender || !nic || !address || !mobile || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the email is already registered
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists.' });
    }
    
    // Create a new client
    const creator  =  await User.findOne({ 'username': username });
    const createdBy = creator._id; // assuming you have a middleware that adds the user id to the request object
    const client = new Client({
      firstName,
      lastName,
      gender,
      nic,
      address,
      mobile,
      email,
      registerDate: Date.now(),
      createdBy,
      createdAt: Date.now()
    });

    // Save the client to the database
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error.' });
  }
});

// Endpoint for retrieving all the clients
router.get('/get-all', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Endpoint for retrieving one client
router.get('/get/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
    
        if (!client) {
          return res.status(404).json({ msg: 'Client not found' });
        }
    
        res.json(client);
    } catch (err) {
        console.error(err.message);
    
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Client not found' });
        }
    
        res.status(500).send('Server Error');
    }
});

// Endpoint for updating an existing client
router.put('/update/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ msg: 'Client not found' });
        } else {
            const { firstName, lastName, gender, nic, address, mobile, email, username } = req.body;
            const moderator  =  await User.findOne({ 'username': username });
            const modifiedBy = moderator._id;

            client.firstName = firstName;
            client.lastName = lastName;
            client.gender = gender;
            client.nic = nic;
            client.address = address;
            client.mobile = mobile;
            client.email = email;
            client.modifiedBy = modifiedBy;
            client.modifiedAt = Date.now();

            const savedClient = await client.save();
            res.status(201).json(savedClient);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error.'});
    }
});

// Endpoint for delete client
router.delete("/delete/:id", async (req, res)  => {
    try {
        const client = await Client.findById(req.params.id);
    
        if (!client) {
          return res.status(404).json({ msg: 'Client not found' });
        } else {
            await client.deleteOne();
            res.json({ message: 'Client has been deleted' });
        }
    } catch (err) {
        console.error(err.message);
    
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Client not found' });
        }
    
        res.status(500).send('Server Error');
    }
});

module.exports = router;