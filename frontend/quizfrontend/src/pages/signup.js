import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Signup()
{   
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [secondname, setSecondname] = useState('');
    const [password, setPassword] = useState('');
  
    async function handleSubmit(e){
      e.preventDefault();
      
      const response = await axios.post('http://localhost:80/signup', {
        username: username,
        firstname : firstname,
        secondname : secondname,
        password: password
      });
      if(response.data === "already exists")
      {
        alert("username already exists");
        setUsername("");
      }
      else {
        Cookies.set("accessToken" , response.data.accessToken);
        navigate('/home')
      window.location.reload();
      }
    };


    return (
        <div>
            <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="firstname">firstname:</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="secondname">secondname:</label>
            <input
              type="text"
              id="secondname"
              value={secondname}
              onChange={(e) => setSecondname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        </div>
    );
}