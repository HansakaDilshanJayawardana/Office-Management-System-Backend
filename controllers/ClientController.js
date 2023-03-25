const Client = require('../models/Client');
const { Router } = require("express");
const router = Router();
const User = require('../models/User');

// Endpoint for adding a new client
router.post('/add', async (req, res) => {
  try {
    // Validate the request body (Null Value Validation)
    const { firstName, lastName, gender, nic, address, mobile, email } = req.body;
    if (!firstName || !lastName || !gender || !nic || !address || !mobile || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Mobile Number Validation
    const mobileNumberRegex = /^[0-9]{10}$/;
    if (!mobileNumberRegex.test(mobile)) {
      return res.status(400).json({ message: 'Please enter a valid 10 digit mobile number' });
    }

    // Email Number Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // NIC Number (SL) Validation
    const nicRegex = /^[0-9]{9}[vVxX]$/;
    if (!nicRegex.test(nic)) {
      return res.status(400).json({ message: 'Please enter a valid NIC' });
    }

    // Check if the email is already registered
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }
    
    // Create a new client
    const client = new Client({
      firstName,
      lastName,
      gender,
      nic,
      address,
      mobile,
      email,
      registerDate: Date.now(),
      createdAt: Date.now()
    });

    // Save the client to the database
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
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
            // Validate the request body (Null Value Validation)
            const { firstName, lastName, gender, nic, address, mobile, email } = req.body;
            if (!firstName || !lastName || !gender || !nic || !address || !mobile || !email) {
              return res.status(400).json({ message: 'All fields are required' });
            }

            // Mobile Number Validation
            const mobileNumberRegex = /^[0-9]{10}$/;
            if (!mobileNumberRegex.test(mobile)) {
              return res.status(400).json({ message: 'Please enter a valid 10 digit mobile number' });
            }

            // Email Number Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              return res.status(400).json({ message: 'Please enter a valid email address' });
            }

            // NIC Number (SL) Validation
            const nicRegex = /^[0-9]{9}[vVxX]$/;
            if (!nicRegex.test(nic)) {
              return res.status(400).json({ message: 'Please enter a valid NIC' });
            }

            client.firstName = firstName;
            client.lastName = lastName;
            client.gender = gender;
            client.nic = nic;
            client.address = address;
            client.mobile = mobile;
            client.email = email;
            client.modifiedAt = Date.now();

            const savedClient = await client.save();
            res.status(201).json(savedClient);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error'});
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