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
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try {
        const {title, description, tag}=req.body;
        // create a new note
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        // Find the note to be updated and update it
        let note=await Note.findById(req.params.id);
        if(!note){res.status(404).send("Note not found")}

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
        res.json({note});
        
    }  catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
    }
)

// ROUTE 4: Delete an existing Note using DELETE route : "/api/notes/deletenote/:id"
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
        // Find the note to be deleted and delete it
        let note=await Note.findById(req.params.id);
        if(!note){ res.status(404).send("Note not found"); }
    
        // allow deleteion only if user is the owner of note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"note has been deleted", note:note});
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }
}
)
module.exports=router;