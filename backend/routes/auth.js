const express = require('express');
const router=express.Router();
const User=require('../models/User');

// create a user using :post request
// when 
router.post('/', (req, res)=>{
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send("auth route");
})
module.exports=router;