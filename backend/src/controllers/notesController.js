import Note from "../models/Note.js"


export const getAllNotes = async (req,res) =>{
    try {
        const notes = await Note.find().sort({createdAt: -1}); 
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}   

export const getNoteById = async (req,res) =>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found!"});
        res.json(note);
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export const createNote = async (req,res) =>{
    try {
        const {title, content} = req.body;
        // console.log(title,content);

        const newNote = new Note({title: title, content: content});
        const savedNote = await newNote.save();
        res.status(201).json({message: "note created successfully",note: savedNote})

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message}); 
    }
}   

export const updateNote = async (req,res) =>{
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{ title, content },{ new: true });

        if(!updatedNote){
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({message: "Note updated successfully", updatedNote: updatedNote});

    } catch (error) {
        // console.log(`Error updating note: ${error}`);
        res.status(500).json({message: "Internal server error", error: error.message}); 
    }
}   

export const deleteNote = async (req,res) =>{
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({message: "Note deleted successfully!"});
    } catch (error) {
        // console.log(`Error updating note: ${error}`);
        res.status(500).json({message: "Internal server error", error: error.message}); 
    }
}   