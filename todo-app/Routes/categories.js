const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

// Create a new category
router.post("/", async (req, res) => {
    try {
        const category = new Category({ name: req.body.name, color: req.body.color });
        await category.save();
        res.json({ message: "Category created successfully", category });
    } catch (err) {
        res.status(400).json({ message: "Error creating category", error: err.message });
    }
});

// Get all categories
router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

module.exports = router;