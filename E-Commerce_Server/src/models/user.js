const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: true,
        require: true
    },
    firstname: {
        type:String,
        unique: false,
        required :true,
    },
    lastname: {
        type:String,
        unique: false,
        required :true,
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    cart: {
        type:Array,
        default:[],
        require: false
    },
    orders: {
        type: Array,
        default: [],
        require:false,
    },
    paymentmethods: {
        type:Array,
        default: [],
        require: false
    }


},
{
    timestamp: true
})
const users = mongoose.model("users", userSchema);
module.exports = users;