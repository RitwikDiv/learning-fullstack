// Getting the required packages
const express = require("express");
const mongoose = require("mongoose");

// Initializing the router
const router = express.Router();

// Load the model
const {Customer, validate} = require("../models/customer");

// Get all customers
router.get("/", async (req, res) => {
    try{
        const customers = await Customer
            .find()
            .sort({name: 1});
        res.send(customers);
    } catch (ex) {
        return res.send(500).send({
            status: 500,
            message: "Unable to get the results"
        });
    }
});

// Get a single customer
router.get("/:id", async (req, res) => {
    try{
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    } catch (ex) {
        return res.status(404).send({
            status: 404,
            message: `Unable to find customer with id: ${req.params.id}`,
        });
    }
});

// Create a customer
router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send({
        status: 400,
        message: `Unable to create a customer: ${error.message}`
    });
    try {
        let customer = new Customer(req.body);
        await customer.save();
        res.send(customer);
    } catch (ex) {
        res.status(500).send({
            status: 500,
            message: `Unable to create a customer: ${ex.message}`
        });
    }
});

// Update a customer
router.put("/:id", async (req, res) => {
    // Validate the object
    // If invalid, return an error
    const { error } = validate(req.body);
    if (error) return res.status(400).send({
        status: 400,
        message: `Unable to update the customer ${error.message}`
    });
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body);
        res.send(customer);
    } catch(ex) {
        res.status(500).send({
            status: 500,
            message: `Unable to update a customer: ${ex.message}`
        });
    }
});

// Delete a customer
router.delete("/:id", async (req, res) => {
    try{ 
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer) return res.status(400).send({
            status: 400,
            message: `Unable to find the customer with id: ${req.params.id}`
        });
        res.send(customer);
    } catch (ex) {
        res.status(400).send({
            status: 400,
            message: `Unable to delete the customer: ${ex.message}`
        });
    }
});

// Export the router
module.exports = router;