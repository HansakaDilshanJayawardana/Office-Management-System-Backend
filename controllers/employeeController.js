const Employee = require('../models/employee');
const User = require('../models/User');
const { Router } = require("express");

const router = Router();

// Endpoint for adding a new employee
router.post('/add', async (req, res) => {
  try {
    // Validate the request body (Null Value Validation)
    const { name, gender, nic, address, contact, email } = req.body;
    if (!name || !gender || !nic || !address || !contact || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Contact Number Validation
    const contactNumberRegex = /^[0-9]{10}$/;
    if (!contactNumberRegex.test(contact)) {
      return res.status(400).json({ message: 'Please enter a valid 10 digit contact number' });
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
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }
    
    // Create a new employee
    const employee = new Employee({
      name,
      gender,
      nic,
      address,
      contact,
      email,
      createdAt: Date.now()
    });

    // Save the employee to the database
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error.' });
  }
});

// Endpoint for updating an existing employee
router.put('/update/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        } else {
            // Validate the request body (Null Value Validation)
            const { name, gender, nic, address, contact, email } = req.body;
            if (!name || !gender || !nic || !address || !contact || !email) {
              return res.status(400).json({ message: 'All fields are required' });
            }
        
            // Contact Number Validation
            const contactNumberRegex = /^[0-9]{10}$/;
            if (!contactNumberRegex.test(contact)) {
              return res.status(400).json({ message: 'Please enter a valid 10 digit contact number' });
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
        
            employee.name = name;
            employee.gender = gender;
            employee.nic = nic;
            employee.address = address;
            employee.contact = contact;
            employee.email = email;
            employee.modifiedAt = Date.now();

            const savedEmployee = await employee.save();
            res.status(201).json(savedEmployee);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error.'});
    }
});

// Endpoint for retrieving one employee
router.get('/get/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
    
        if (!employee) {
          return res.status(404).json({ msg: 'Employee not found' });
        }
    
        res.json(employee);
    } catch (err) {
        console.error(err.message);
    
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Employee not found' });
        }
    
        res.status(500).send('Server Error');
    }
});

// Endpoint for retrieving all the employees
router.get('/get-all', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Endpoint for delete employee
router.delete("/delete/:id", async (req, res)  => {
    try {
        const employee = await Employee.findById(req.params.id);
    
        if (!employee) {
          return res.status(404).json({ msg: 'Employee not found' });
        } else {
            await employee.deleteOne();
            res.json({ message: 'Employee has been deleted' });
        }
    } catch (err) {
        console.error(err.message);
    
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Employee not found' });
        }
    
        res.status(500).send('Server Error');
    }
});

module.exports = router;
