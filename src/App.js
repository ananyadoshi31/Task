import logo from "./logo.svg";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";

function App() {
  // state for storing users
  const [users, setUsers] = useState([]);
  // state for storing filtered users
  const [filteredUsers, setFilteredUsers] = useState([]);
  // state for storing particular user to view further details
  const [selectedUser, setSelectedUser] = useState(null);

  // loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // state for search input
  const [search, setSearch] = useState("");

  // state for sorting
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const detailRef = useRef(null); //reference for scroll to user details whenevr selected

  // fetches all users from API on initial render request
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

    // implementing filter (based on email and name) functionality
    updated = updated.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    // implementing sort functionality if that field is selected
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

  // loading and error handling
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users.</p>;

  return (
    <div className="App">
      <h1>User Directory</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or email.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSortField(e.target.value)} defaultValue="">
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          defaultValue="asc"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
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
              }, 100);
            }}
          />
        ))}
      </div>

      {/* 
        diplays details of user if selected further */}
      {selectedUser && (
        <div ref={detailRef}>
          <UserDetails user={selectedUser} />
        </div>
      )}
    </div>
  );
}

export default App;
