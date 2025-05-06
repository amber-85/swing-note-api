import {useState, useEffect} from "react"

interface Note{
    _id:string;
    title:string;
    text:string;
    createdAt?:string;
    modifiedAt?:string;
}

interface NotePageProps{
    token:string;
    onLogout:()=>void;
    
}


const NotesPage=({token, onLogout}:NotePageProps)=>{
    const [notes, setNotes]=useState<Note[]>([]);
    const [form, setForm]=useState({title:"", text:""});
    const [editForm, setEditForm]=useState<{id:string;title:string;text:string}|null>(null);
    const [showCreateForm, setShowCreateForm]=useState(false);
    const [message, setMessage]=useState("");




//fetch notes from server
    const fetchNotes=async ()=>{
        const response=await fetch("http://localhost:8091/api/notes",{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            },
        });

        const data=await response.json();
        if (response.status===200){
            setNotes(data.notes);
        }else{setMessage(data.message||"Failed to fetch notes");
        }
};
//call fetchNotes from useEffect notes from server
    useEffect(()=>{
        fetchNotes();
    }, [token]);
    
    

    //handle change function

    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    //handle edit change function
    const handleEditChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        if (!editForm) return;
        setEditForm({...editForm, [e.target.name]:e.target.value});
    };

    //handle create note funciton
    const handleCreateNote=async (e:React.FormEvent)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:8091/api/notes",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`,
            },
            body:JSON.stringify(form),
        });
        const data=await response.json();
        if (response.status===201){
            setForm({title:"", text:""});        
            setShowCreateForm(false);
            setMessage("Note created successfully");
            fetchNotes();
        }else{
            setMessage(data.message||"Failed to create note");
        }
    };


    //handle submit function
    const handleEditSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        if (!editForm) return;
        const response=await fetch("http://localhost:8091/api/notes",{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({...editForm, id:editForm.id}),
        });
        const data =await response.json();
        if (response.status===200){
            setEditForm(null);
            setMessage("Note updated");
            fetchNotes();
        } else{
            setMessage(data.message || "Failed to update note");
        }
    };

    //handle delete function
    const handleDelete=async (id:string)=>{
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        const response=await fetch("http://localhost:8091/api/notes",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`,
            },
            body:JSON.stringify({id}),
        });

        const data=await response.json();
        if (response.status===200){
            setMessage("Note deleted");
            fetchNotes();
        } else{
            setMessage(data.message || "Failed to delete note");
        }
    };


    return(
       <div className="note">
            
            <h1 className="note__title">My Notes</h1>
            <button className="note__logout__btn" onClick={onLogout}>Logga ut</button>
            <p className="note__user__name"></p>
            {message && <p>{message}</p>}

            {/* Toggle Create Note Form */}
            <button className="note__create__btn" onClick={()=>setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? "Cancel":"Add New Note"}
            </button>

            {showCreateForm && (
                <form className="note__create" onSubmit={handleCreateNote}>
                    <h3 className="note__create__title">Create Note</h3>
                    <section className="note__create__form">
                        <input
                            className="note__create__form__title"
                            name="title"
                            placeholder="Titln"
                            value={form.title}
                            onChange={handleChange}
                        />
                        <textarea 
                            className="note__create__form__text"
                            name="text" 
                            placeholder="texten"
                            value={form.text}
                            onChange={handleChange}
                        />
                        <button className="note__create__form__btn" type="submit"> Skapa</button>
                    </section>
                </form>
            )}

            {/* list of existed notes */}
            <ul className="note__list">
                {notes.map(note=>(  
                    <li className="note__list__item" key={note._id}>
                        {editForm?.id===note._id ?(
                            <form onSubmit={handleEditSubmit}>
                                <input
                                    className="note__list__item__edit__title"
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditChange}
                                    placeholder={note.title}
                                />
                                <textarea
                                    className="note__list__item__edit__text"
                                    name="text"
                                    value={editForm.text}
                                    onChange={handleEditChange}
                                />
                                <button className="note__list__item__btn" type="submit">Spara</button>
                                <button className="note__list__item__btn" onClick={()=>setEditForm(null)}>Avboka</button>
                            </form>
                        ):(
                            <>
                                <h4 className="note__list__item__title">{note.title}</h4>
                                <p className="note__list__text">{note.text}</p>
                                <button className="note__list__btn" onClick={()=>
                                    setEditForm({id:note._id, title:note.title, text:note.text})
                                }>
                                    Redigera
                                </button>
                                <button onClick={()=>handleDelete(note._id)}>Ta bort</button>
                            </>
                        )}
                    </li>                     
                ))}           
            </ul>
       </div>
    );
}

export default NotesPage;