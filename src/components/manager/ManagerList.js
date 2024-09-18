import React, { useEffect, useState } from "react";
import axios from "axios";
import './ManagerList.css';

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/managers");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:8080/api/managers/${editId}`, {
          firstName,
          lastName,
          email,
          password,
        });
        setIsEdit(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:8080/api/managers", {
          firstName,
          lastName,
          email,
          password,
        });
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      fetchManagers();
    } catch (error) {
      console.error("Error submitting manager:", error);
    }
  };

  const handleEdit = (id, manager) => {
    setIsEdit(true);
    setEditId(id);
    setFirstName(manager.firstName);
    setLastName(manager.lastName);
    setEmail(manager.email);
    setPassword(manager.password);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/managers/${id}`);
      fetchManagers();
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  return (
    <div className="manager-container">
      <div className="manager-form-container">
        <h2>{isEdit ? "Edit Manager" : "Add Manager"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">{isEdit ? "Update" : "Add"}</button>
        </form>
      </div>

      <div className="manager-list-container">
        <h2>Manager List</h2>
        <ul>
          {managers.map((manager) => (
            <li key={manager.id}>
              ID: {manager.id} - {manager.firstName} {manager.lastName} ({manager.email})
              <div className="button-container">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(manager.id, manager)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(manager.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerList;
