import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/login`);
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
          <label htmlFor="username">
            Username <span className="required">*</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleChange}
          />
          <button type="submit" className="signin-btn">
            Proceed for Sign In <span className="arrow">›</span>
          </button>
        </form>

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

export default SignIn;