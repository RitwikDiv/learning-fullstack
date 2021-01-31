// Importing the modules
const Joi = require("joi");
const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    street: String, 
    city: String,
    state: {
        type: String,
        minLength: 2,
        maxLength: 2,
        uppercase: true
    },
    zip: Number
});

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    from: {
        type: Date, 
        default: Date.now,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    address: {
        type: addressSchema,
        required: false
    }
});

// Create the model
const Customer = mongoose.model("Customer", customerSchema);

// Create the JOI validator
function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(2).max(50),
        isGold: Joi.boolean(),
        address: {
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string().min(2).max(2),
            zip: Joi.number().max(100000)
        }
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;