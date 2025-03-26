// src/components/UserCard.js
import React from "react";
import "../App.css";

function Users({ user, onClick }) {
  return (
    <div className="user-card" onClick={onClick}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

export default Users;
