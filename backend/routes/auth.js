const express = require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');

// create a user using :post request
// when 
router.post('/', 
    body('email').isEmail(), 
    body('name').isLength({min:3}),
    body('password').isLength({min:5}),
    (req, res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        User.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email          
        }).then(user=>res.json(user))
        .catch(err=>{
            console.log(err)
            res.json({error:"please enter a unique value", message:err.message})
        });

    },
)
module.exports=router;