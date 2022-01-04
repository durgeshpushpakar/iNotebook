const express = require('express');
const router=express.Router();
let fetchuser=require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE:1 GET all the notes using GET: "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes=await Note.find({id:req.user.id})
        res.json(notes);
    } catch (err) {
        console.log(err.message);
      }
})

// ROUTE 2: Add a new note using POST: "/api/notes/addnote"
router.post('/addnote', fetchuser,
    body("title", 'Enter a valid title').isLength({ min: 3 }),
    body("description", 'description must be atleast 5 characters').isLength({ min: 5 }), 
    async (req, res)=>{
        try {
            const {title, description, tag}=req.body;
            // if there are errors then return bad request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, 
                user:req.user.id
            })
            const savedNote = await note.save();
            res.json(savedNote);

        }  catch (err) {
                console.log(err.message);
                res.status(500).send("Internal server error!");
            }
        
    }
)
// ROUTE 3: Update an existing Note: "/api/notes/updatenote"
router.post('/addnote', fetchuser,
    body("title", 'Enter a valid title').isLength({ min: 3 }),
    body("description", 'description must be atleast 5 characters').isLength({ min: 5 }), 
    async (req, res)=>{
        
    }
)

module.exports=router;