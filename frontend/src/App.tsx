import {Routes, Route, Navigate} from "react-router-dom";
import {useState} from "react";

//import css


// import signupPage, LoginPage, NotesPage
import SignupPage from "./components/signuppage.tsx";
import LoginPage from "./components/loginpage.tsx";
import NotesPage from "./components/notespage.tsx";

function App(){
  const [token, setToken]=useState<string|null>(localStorage.getItem("token"));
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage setToken={setToken}/>} />
      <Route path="/signup" element={<SignupPage setToken={setToken}/>} />
      <Route 
        path="/notes" 
        element={
          token? (
            <NotesPage token={token} onLogout={handleLogout}/>
          ):(
            <Navigate to="/" replace/>
          )
        }
      />
    </Routes>
        );
}

export default App;