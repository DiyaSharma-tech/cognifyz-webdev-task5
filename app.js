// Import express
const express = require("express");

// Create app
const app = express();

// Port number
const PORT = 3000;

// Fake database
let users = []; 
// Middleware
app.use(express.json());

// Set EJS
app.set("view engine", "ejs");

// Static folder
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {

    res.render("index");

});

// GET all users
app.get("/api/users", (req, res) => {

    res.json(users);

});

// Add user
app.post("/api/users", (req, res) => {

    const user = req.body;

    users.push(user);

    res.json({
        message: "User added successfully",
        users
    });

});

// Delete user
app.delete("/api/users/:index", (req, res) => {

    const index = req.params.index;

    users.splice(index, 1);

    res.json({
        message: "User deleted",
        users
    });

});

// Start server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});