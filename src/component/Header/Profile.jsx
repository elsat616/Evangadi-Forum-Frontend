import React, { useState } from "react";
import "./profile.css";
import Layout from "../Layout/Layout";

function Dashboard() {
  const [activeNavItem, setActiveNavItem] = useState("profile");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set the initial login status to true

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const handleProfileUpdate = (formData) => {
    // Perform profile update logic here
    console.log("Updated profile information:", formData);
  };

  const handlePasswordReset = (formData) => {
    // Perform password reset logic here
    console.log("Password reset requested for email:", formData.email);
  };

  const handleProfilePictureUpload = (formData) => {
    // Perform profile picture upload logic here
    console.log("Profile picture uploaded:", formData.picture);
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="sidebar">
          <ul>
            <li
              className={activeNavItem === "profile" ? "active" : ""}
              onClick={() => handleNavItemClick("profile")}
            >
              Profile
            </li>
            <li
              className={activeNavItem === "password" ? "active" : ""}
              onClick={() => handleNavItemClick("password")}
            >
              Reset Password
            </li>
            <li
              className={activeNavItem === "picture" ? "active" : ""}
              onClick={() => handleNavItemClick("picture")}
            >
              Upload Picture
            </li>
          </ul>
        </div>
        <div className="content">
          {activeNavItem === "profile" && (
            <div>
              <h2>Profile</h2>
              <ProfileForm onSubmit={handleProfileUpdate} />
            </div>
          )}
          {activeNavItem === "password" && (
            <div>
              <h2>Reset Password</h2>
              <ResetPasswordForm onSubmit={handlePasswordReset} />
            </div>
          )}
          {activeNavItem === "picture" && (
            <div>
              <h2>Upload Picture</h2>
              <UploadPictureForm onSubmit={handleProfilePictureUpload} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

function ResetPasswordForm({ onSubmit }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email });
    setEmail("");
  };

  return (
    <form className="reset-password-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
}

function UploadPictureForm({ onSubmit }) {
  const [picture, setPicture] = useState(null);

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ picture });
    setPicture(null);
  };

  return (
    <form className="upload-picture-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="file" accept="image/*" onChange={handlePictureUpload} />
      </div>
      {picture && (
        <div className="preview">
          <h4>Preview:</h4>
          <img src={URL.createObjectURL(picture)} alt="Profile" />
        </div>
      )}
      <button type="submit">Upload Picture</button>
    </form>
  );
}
export default Dashboard;
