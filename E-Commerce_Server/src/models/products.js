const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    subTitle: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
    },
    price: { 
        type: Number, 
        required: true 
    },
    images: [
        { 
            type: String 
        }
    ],
    space: [
        { 
            type: String 
        }
    ],
    color: [
        { 
            type: String 
        }
    ],
    stockQuantity: { 
        type: Number, 
        default: 0 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;