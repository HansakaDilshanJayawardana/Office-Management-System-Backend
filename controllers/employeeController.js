const Employee = require('../models/Employee');
const { Router } = require("express"); // import router from express

const router = Router();

//Add an Employee
router.post("/add", async (req, res) => {
    const { name, gender, nic, address, contact } = req.body;

    //Validation
    if(!name  || !gender || !nic || !address || !contact) {
        return res.status(400).json({
            success: false,
            message: 'Please Fill All the Fields'
        });
    }

    //check if employee already exists
    const employee = await Employee.findOne({ nic });

    //if employee exists
    if (employee) {
        return res.status(400).json({
            success: false,
            message: 'Employee Already Exists'
        });
    }

    //create employee
    const newEmployee = new Employee({
        name,
        gender,
        nic, 
        address,
        contact
    });

    //save employee
    await newEmployee.save();

    if (newEmployee) {
        res.status(201).json({
            success: true,
            data: newEmployee
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Employee not Added'
        });
        throw new Error('Employee not added');
    }
});

//Retrieve all the employees
router.get("/get", async (req, res) => {
    const employee = await Employee.find();

    if (employee) {
        res.status(200).json({
            success: true,
            data: employee
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: 'No Employees Found'
        });
        throw new Error('No Employees Found');
    }
});

//Update employee
router.put("/update/:id", async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return res.status(400).json({
            success: false,
            message: 'No employees found'
        });
    } else {
        const { name, gender, address, contact } = req.body;

        employee.name = name;
        employee.gender = gender;
        employee.address= address;
        employee.contact= contact;

        await employee.save();

        res.status(200).json({
            success: true,
            data: employee
        });
    }
});

//Delete employee
router.delete("/delete/:id", async (req, res)  => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return res.status(400).json({
            success: false,
            message: 'No data found'
        });
    } else {
        await employee.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'Employee Removed Successfully'
        });
    }
});

module.exports = router;