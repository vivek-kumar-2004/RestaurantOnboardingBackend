const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();
exports.register = async (req, res) => {
    try{
        const{name,email,password,role,restaurant_name,address}=req.body;

        const exitingUser=await User.findOne({email});

        if(exitingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists',
            })
        }
        let hashPassword;
        try{
            hashPassword=await bcrypt.hash(password,10);
        }
        catch(err){
            console.error(err);
            res.status(500).json({
                success:false,
                message:'password in not encrypted there is a error',
            })
        }
        const newUser=await User.create(
            {name,email,password:hashPassword,role,restaurant_name,address}
        );
        
        res.status(200).json({
            success:true,
            message:'User created successfully',
            data:newUser
        })
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try{
        const {email,password}=req.body;

        if(!email||!password){
            res.status(400).json({
                success:false,
                message:'Please provide email and password',
            })
        }

        let user=await User.findOne({email});
        if(!user){
            res.status(401).json({
                success:false,
                message:'User not found',
            })
        }

        let payload={
            id:user._id,
            email:user.email,
            role:user.role,
        }
        
        if(await bcrypt.compare(password,user.password)){
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h',
                algorithm:'HS256',
            })

            user=user.toObject();
            user.token=token;
            user.password=undefined;

            console.log(user);
            

            const options={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("vikki",token,options).status(200).json({
                success:true,
                message:'User logged in successfully',
                user,
                token,
            })
        }
        else{
            res.status(401).json({
                success:false,
                message:'Incorrect password',
            })
        }
    }
    catch(err){
        console.error(err);
        console.log("error");
        res.status(500).json({
            success:false,
            message:'Server error',
        })
    }
}