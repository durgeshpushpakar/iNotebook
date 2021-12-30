const express = require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const JWT_SECRET="durgeshisagoodbo$y";

// create a user using :post /api/auth/createuser request no login required
// signup route getting user datails using post request
router.post('/createuser',
    body('email').isEmail(), 
    body('name').isLength({min:3}),
    body('password').isLength({min:5}),
    async (req, res)=>{
        // if there are errors then return bad request
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        try{
            // check whether the user with the same email exists already
            let user=await User.findOne({email:req.body.email});
            if(user){
                return res.status(400).json({error:"sorry this email is already registered!"});
            }
            // hashing the password using bcrypt
            const salt=await bcrypt.genSalt(10);
            let secPass=await bcrypt.hash(req.body.password, salt);
            user =await  User.create({
                name:req.body.name,
                password:secPass,
                email:req.body.email
            })
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(authToken);
            // console.log(user)
            res.json({authToken});
        }catch(err){
            console.log(err.message);
        }
    }
)

//Authenticate a user using :POST "/api/auth/login". No login required
// login POST route
router.post('/login',
    body('email', "enter a valid email").isEmail(),
    body('password', "password cannot be blank").exists(),
    async (req, res)=>{
        // if there are errors then return bad request
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {email, password}=req.body;
        try{
            let user=await User.findOne({email});
            if(!user){
                return res.status(400).json({error:"try to login with correct credentials!"});
            }

            const passwordCompare=await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({error:"try to login with correct credentials!"});
            }
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({authToken});
        }catch(err){
            console.log(err.message);
            res.status(500).send("Internal server error!");
        }
        
    }
)


module.exports=router;