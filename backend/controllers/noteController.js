import notesDb  from "../models/noteModel.js";


// GET /api/notes fetch all note for the loggedin user
const getNotes= (req,res)=>{
    notesDb
        .find({userId:req.userId})
        .sort({createdAt:-1}) //sort by createdAt in descending order
        .exec((err,notes)=>{
            if (err) return res.status(500).json({message:"Server error"});
            res.status(200).json({notes});
        });
}



// GET /api/notes/:id fetch a single note for the loggedin user
const getNoteById=(req,res)=>{
    const {id}=req.params;
    if (!id) return res.status(400).json({message:"Note Id is required"});
    notesDb.findOne({_id:id, userId:req.userId}, (err,note)=>{
        if (err) return res.status(500).json({message:"Server error"});
        if (!note) return res.status(404).json({message:"Note not found"});
        res.status(200).json({note});
    })
}



//POST /api/notes Create a new note
const createNote=(req,res)=>{
    console.log("create Note hits:",req.body, "user:",req.userId);
    const {title, text}=req.body;

    if (!title || !text || title.length>50 || text.length>300){
        return res.status(400).json({message:"title and text are required and should be within the length limit"});
    }

    const newNote={
        title,
        text,
        createdAt: new Date(),
        modifiedAt: new Date(),
        userId: req.userId
    };

    notesDb.insert(newNote, (err,savedNote)=>{
        if (err) {
            console.log("insert error:",err)
            return res.status(500).json({message:"Server error"});
        }

        console.log("Note saved:", savedNote);
        res.status(201).json({message:"Note created successfully", note:savedNote})
    });
    //check if note is created
};



// PUT /api/notes/ Update existing note
const updateNote=(req,res)=>{
    const {id, title, text}=req.body;

    if (!id || !title || !text || title.length>50 || text.length>300){
        return res.status(400).json({message:"invalid input"});
    }

    notesDb.update(
        {_id:id, userId:req.userId},
        {$set:{title, text, modifiedAt: new Date()}},
        {},
        (err, numUpdated)=>{
            if (err) return res.status(500).json({message:"server error"});
            if (numUpdated===0)
                if (err) return res.status(404).json({message:"Note not found"});
                res.status(200).json({message:"Note updated successfully"});  
        }
    );
    //check if note is updated

};



// DELETE /api/notes  Delete a note
const deleteNote=(req, res)=>{
    const {id}=req.body;

    if (!id) return res.status(400).json({message:"Note ID is required"});

    notesDb.remove({_id:id, userId:req.userId}, {}, (err, numRemoved)=>{
        if (err) return res.status(500).json({message:"Server error"});
        if (numRemoved===0) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:" Note deleted successfully"});
    });
};

// GET /api/notes Search notes this is for VG
// serchNotes=(req, res)=>{
//     const {title}=req.query;
//     if (!title) return res.status(400).json({message:"missing search term"});
//     notesDb.find({userId:req.userId, title:{$regex:regex}}, (err, notes)=>{
//         if (err) return res.status(500).json{message:"server error"};
//         res.status(200).json(notes);
//     });
// };

export default {getNotes, getNoteById, createNote, updateNote, deleteNote}