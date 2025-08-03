import React, { useEffect, useState }  from 'react'
import Navbar from '../Components/Navbar'
import RateLimitUI from "../Components/RateLimitUI"
import toast from "react-hot-toast"
import NoteCard from '../Components/NoteCard';
import api from "../lib/Axios.js";
import NotesNotFound from "../Components/NotesNotFound.jsx"

const Home = () => {
  const [israteLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async() =>{
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if(error.response.status == 429){
          setIsRateLimited(true)
        }else{
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  },[]);

  return (
    <div className='min-h-screen'>
      <Navbar/>

      <p className='text-2xl font-light text-primary font-mono tracking-tighter p-5 text-center'>  Write anything about <strong>Supriyo Giri (me/ADMIN)</strong> — it's public and <strong>100% anonymous</strong>! 
  Notes can't be deleted, so post wisely.</p>

      {israteLimited && <RateLimitUI/>}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}
        {notes.length === 0 && !israteLimited && <NotesNotFound />} 

        {notes.length > 0 && !israteLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) =>(
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}

          </div>
        )}
      </div>
    </div>
  )
}

export default Home