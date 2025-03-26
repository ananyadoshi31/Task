// src/components/UserDetails.js
import React from "react";
import "../App.css";

function UserDetails({ user }) {
  return (
    <div className="user-details">
      <h2>Details of {user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
      <p>
        <strong>Address:</strong> {user.address.street}, {user.address.city}
      </p>
    </div>
  );
}

export default UserDetails;
