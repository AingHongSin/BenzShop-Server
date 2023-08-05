const mongoose = require("mongoose");

// Define the schema for the Order collection
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Reference to the "User" model, assuming you have a "User" model defined
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    shipping: {
        type: Object,

        shipingAddress: {
            type: String,
        },

        shipppingMehode: {
            type: Object,
            title: {
                type: String,
            },
            prict: {
                type: Number,
            },
        },
    },
    billingaddress: {
        type: String,
    },
    paymentmethod: {
        type: mongoose.Schema.Types.ObjectId,
		ref: "creditcard", 
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
});

// Create the Order model
const Order = mongoose.model("order", orderSchema);

// Export the model to be used in other parts of the application
module.exports = Order;
