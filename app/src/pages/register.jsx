import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Register() {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const nav=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(" http://localhost:7000/Manage/register", {
        username,
        email,
        password,
      });

      
      toast.success("Registration successful")
      setTimeout(()=>{
        nav("/");
      },1000)
     
    } catch (error) {
      toast.error(error.message);
    
    }
  };

  return (
    <div className="login-container">
      <div className="content-login">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email-reg">Email</label>
            <input
              type="email"
              id="email-reg"
              name="email-reg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>
          <a href="/" className="login-link">
            Already have an account? Login
          </a>
        </form>
      </div>
    </div>
  );
}
