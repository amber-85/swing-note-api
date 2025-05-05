import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


interface SignupPageProps{
    setToken:(token:string)=>void;
}
const SignupPage: React.FC<SignupPageProps>=({setToken})=>{
    const [form, setForm]=useState({username:"", password:""});
    const [message, setMessage]=useState("");
    const navigate=useNavigate();
   

    //create hanle change function of the form
    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        setForm({...form, [e.target.name]:e.target.value})};
    
    //create handle signup function
    const handleSignup=async (e:React.FormEvent)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:8091/api/user/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form)
        });
        const data=await response.json();
        if (response.status===200){
            setToken(data.token);
            setMessage("Signup successfully");
            navigate("/notes")

        }else{
            setMessage(data.message||"Signup Failed");
        }
    };

    return(
        <form className="signup__form" onSubmit={handleSignup}>
            <h1>Sign Up</h1>
            <input className="signup__form__name" type="text" name="username" onChange={handleChange} placeholder="Änvandare"/>
            <input className="signup__form__password" type="password" name="password" onChange={handleChange} placeholder="lösenord"/>
            <button type="submit" className="signup__form__btn">Sign Up </button>
            {message && <p>{message}</p>}
            <p className="signup__form__ms" >
                Redan får konto? Logga in <Link to="/">här</Link>
            </p>
        </form>
    );
}

export default SignupPage;