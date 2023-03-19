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

module.exports = router;