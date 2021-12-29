const express = require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');

// create a user using :post /api/auth/createuser request no login required
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
            user =await  User.create({
                name:req.body.name,
                password:req.body.password,
                email:req.body.email
            })
            res.json({"Nice":"nice"})
            console.log(user)
        }catch(err){
            console.log(error.message);
        }
    }
)
module.exports=router;