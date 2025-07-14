import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First login request
      const response = await axios.post(
        "http://localhost:7000/Manage/login",
        { email, password },
        { withCredentials: true } // <-- Must be here
      );

      console.log("Login response:", response.data);

      // Now call session-check to verify session persistence
      const sessionResponse = await axios.get(
        "http://localhost:7000/Manage/getUserInSession",
        { withCredentials: true }
      );

      console.log("Session check response:", sessionResponse.data);

      if (sessionResponse.data.user) {
        // Save the session user in localStorage
        localStorage.setItem("userr", JSON.stringify(sessionResponse.data.user));
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/main");
        }, 2000);
      } else {
        toast.error("Session not found after login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="content-login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
          <a href="/register" className="register-link">
            Don't have an account? Register
          </a>
        </form>
      </div>
    </div>
  );
}
