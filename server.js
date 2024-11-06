// server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let items = []; // Simulating a simple in-memory database

// Create a new item
app.post("/items", (req, res) => {
  const item = req.body;
  if (!item.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  items.push(item);
  res.status(201).json(item);
});

// Get all items
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

// Get a specific item by ID
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.status(200).json(item);
});

// Delete an item
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.splice(index, 1);
  res.status(200).json({ message: "Item deleted" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
