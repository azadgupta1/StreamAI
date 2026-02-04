import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function SignUp(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async () =>{
        try{
            const response = await axios.post(
                "http://localhost:3000/api/auth/signup", 
                {
                    username: username,
                    email: email,
                    password: password
                }
            );
        
            setMessage("SignUp Successful!");
            console.log(response.data);

            navigate("/dashboard");

        } catch(error){
            setMessage("SignUp Failed");
            console.error(error);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center space-y-10">
            <h2>SignUp</h2>
            <div className="flex flex-col border rounded-2xl p-10">
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}

                    className="bg-black"
                />
                <br></br>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black"
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black"
                />
                <br></br>

                <button onClick={handleSignUp} className="bg-white text-black rounded-2xl">Sign Up</button>
            </div>
            
            <p>{message}</p>
        </div>
    )
}