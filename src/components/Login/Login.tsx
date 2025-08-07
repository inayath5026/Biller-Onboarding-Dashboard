import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
    navigate(`/dashboard`);
  };

  return (
    <div className="container">
      <div className="signin-box">
        <img
          src="https://via.placeholder.com/200x50?text=InvoiceCloud+Logo"
          alt="InvoiceCloud Logo"
          className="logo"
        />
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label htmlFor="username">
            Username <span className="required">*</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password */}
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit button */}
          <button type="submit" className="signin-btn">
            Submit <span className="arrow">›</span>
          </button>
        </form>

        {/* Forgot password */}
        <p className="forgot-password">
          Don't remember your password?{" "}
          <a href="#">Click here to reset your password</a>
        </p>

        {/* Demo instructions */}
        <div className="demo-box">
          <p><strong>Demo Instructions:</strong></p>
          <ul>
            <li>Try username "legacy123" to see legacy flow with password field</li>
            <li>Try username "notfound" to see SecureAuth redirect (user not found)</li>
            <li>Any other username will redirect to SecureAuth for authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
