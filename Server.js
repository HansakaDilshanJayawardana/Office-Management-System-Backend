require ("dotenv").config() // load .env variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const {log} = require("mercedlogger") // import mercedlogger's log function
const cors = require("cors") // import cors
const UserRouter = require("./controllers/UserController") //import User Routes
const InventoryRouter = require("./controllers/InventoryController") //import Inventory Routes
const DocumentRouter = require("./controllers/DocumentController") //import Document Routes
const EmployeeRouter = require("./controllers/employeeController") //import Employee Routes

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT = 3000} = process.env

// Create Application Object
const app = express()

// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies



// ROUTES AND ROUTES
app.get("/", (req, res) => {res.send("this is the test route to make sure server is working")})

app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing
app.use("/inventory", InventoryRouter) // send all "/inventory" requests to InvenoryRouter for routing
app.use("/document", DocumentRouter) // send all "/document" requests to DocumentRouter for routing
app.use("/employee", EmployeeRouter)//send all /employee requests to EmployeeRouter for rounting

// APP LISTENER
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))