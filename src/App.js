import logo from "./logo.svg";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const detailRef = useRef(null); // create a ref

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updated = [...users];

    // Filter
    updated = updated.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    // Sort
    if (sortField) {
      updated.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField].localeCompare(b[sortField]);
        } else {
          return b[sortField].localeCompare(a[sortField]);
        }
      });
    }

    setFilteredUsers(updated);
  }, [search, sortField, sortOrder, users]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users.</p>;

  return (
    <div className="App">
      <h1>User Directory</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="user-list">
        {filteredUsers.map((user) => (
          <Users
            key={user.id}
            user={user}
            onClick={() => {
              setSelectedUser(user);
              setTimeout(() => {
                detailRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 100); // wait briefly for component to render
            }}
          />
        ))}
      </div>

      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}

export default App;
