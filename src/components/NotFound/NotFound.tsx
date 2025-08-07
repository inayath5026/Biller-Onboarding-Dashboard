import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <img
          src="https://via.placeholder.com/200x50?text=InvoiceCloud+Logo"
          alt="InvoiceCloud Logo"
          className="notfound-logo"
        />
        <h2 className="notfound-heading">Page Not Found</h2>
        <p className="notfound-description">
          The page you are looking for does not exist or has been moved.
        </p>
        <button className="notfound-button" onClick={() => navigate("/signin")}>
          Go Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default NotFound;