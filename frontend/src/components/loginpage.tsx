import {useState} from "react";
import {Link, useNavigate} from "react-router-dom"

interface LoginPageProps{
    setToken:(token:string)=>void;
}

const LoginPage:React.FC<LoginPageProps>=({setToken})=>{
    const [form, setForm]= useState({username:"", password:""});
    const [message, setMessage]=useState("");
    const navigate=useNavigate();

    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        setForm({...form, [e.target.name]:e.target.value});
    }

    const handleLogin= async (e:React.FormEvent)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:8091/api/user/login",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(form)
        });
        const data= await response.json();
        if (response.status===200){
            setToken(data.token);
            localStorage.setItem("token", data.token);
            setMessage("login successful");
            navigate("/notes");
        }else{
            setMessage(data.message);
        }
    };

    return(
        <form className="login__form" onSubmit={handleLogin}>
            <h1 className="login__form__tittle">Logga In</h1>
            <input className="login__form__name" name="username" type="text" onChange={handleChange} placeholder="änvandare"/>
            <input className="login__form__name" name="password" type="password" onChange={handleChange} placeholder="lösenord"/>
            <button className="signup__form__btn" type="submit">Logga In</button>
            {message && <p>{message}</p>}
            <p className="login__form__ms" >
                Inget konto? Skapa <Link to="/signup">här</Link>
            </p>
        </form>
    );
}

export default LoginPage;