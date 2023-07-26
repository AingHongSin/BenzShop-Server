const users = require('../models/user');
const { encryptPass, decryptPass } = require('../config/encrypt')
const jwt = require('jsonwebtoken');


const register = async(parameter)=>{
    const { username,firstname,lastname,email,password,phone } = parameter;
    try{
        var existing = await users.findOne({email});
        console.log(existing);
        if(existing!=null){
            throw "Email is already in used!";
        }
        existing = await users.findOne({username});
        if(existing!=null){
            throw "Username is already in used!";
        }
        const hash = encryptPass(password);

        const newUser = {
            username,
            firstname,
            lastname,
            email,
            password: hash,
            phone,
        }
        console.log(newUser);
        const createUser = await users.create(newUser);
        return {
            success: true,
            data: createUser
        }
    }catch(err){
        console.log(err)
        return {
            success: false,
            error: err
        }
    }
}
const login = async(email,password)=>{
    // console.log(email);
    // console.log(validEmail);
    try{

        const validEmail = await users.findOne({email});
        if(!validEmail){
            throw "Invalid email";
        }
        const decrypt = decryptPass(password,validEmail.password);
        if(!decrypt){
            throw "Incorrect password!";
        }
        const token = jwt.sign({email,password}, 'S@ecret');
        return {
            success: true,
            data: {validEmail, token}
            
        }
    }catch(err){
        console.log(err)
        return {
            success: false,
            error: err
        }

    }
    
}


const getMe = async(email)=>{
    try{
        const user = await users.findOne({email});
        console.log(user);
        return user;
    }catch(err){
        throw "Invalid User!";
    }
}

module.exports = {register, login, getMe}