import Datastore from "nedb";

const notesDb= new Datastore({filename:"./db/notes.db", autoload:true});

export default notesDb;