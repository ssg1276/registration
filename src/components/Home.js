
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [students, setStudents] = useState([{ id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com" },
  { id: 4, name: "Alice Williams", email: "alice.williams@example.com" },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com" },
  { id: 6, name: "Emma Davis", email: "emma.davis@example.com" },
  { id: 7, name: "Ryan Miller", email: "ryan.miller@example.com" },
  { id: 8, name: "Olivia Wilson", email: "olivia.wilson@example.com" },
  { id: 9, name: "Daniel Taylor", email: "daniel.taylor@example.com" },
  { id: 10, name: "Sophia Moore", email: "sophia.moore@example.com" },]);
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setEditingStudent({ ...studentToEdit });
  };

  const handleSaveEdit = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === editingStudent.id ? editingStudent : student
      )
    );
    setEditingStudent(null);
  };

  useEffect(() => {
    // Placeholder: Fetch students from your API or source
    const fetchData = async () => {
      try {
        const response = await UserService.getAllStudents();
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (id) => {
    const student = students.find((student) => student.id === id);

    alert(
      `Name: ${student.name}\nEmail: ${student.email}\nPhone: ${student.phone}\nAddress: ${student.address}`
    );
  };

  const tableCellStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h3>Welcome to the Home Page!</h3>
      </header>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>Name</th>
            <th style={tableCellStyle}>Email</th>
            <th style={tableCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={tableCellStyle}>{student.id}</td>
              <td style={tableCellStyle}>{student.name}</td>
              <td style={tableCellStyle}>{student.email}</td>
              <td style={tableCellStyle}>
                <button
                  style={{
                    padding: "8px 12px",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => handleEdit(student.id)}
                >
                  Edit
                </button>
                <button
                  style={{
                    padding: "8px 12px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleViewDetails(student.id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingStudent && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Edit Student</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit();
            }}
          >
            <label style={formLabelStyle}>Name:</label>
            <input
              type="text"
              value={editingStudent.name}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  name: e.target.value,
                })
              }
              style={formInputStyle}
            />
            <label style={formLabelStyle}>Email:</label>
            <input
              type="text"
              value={editingStudent.email}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  email: e.target.value,
                })
              }
              style={formInputStyle}
            />
            <button type="submit" style={formButtonStyle}>
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const formLabelStyle = {
  display: "block",
  margin: "10px 0 5px",
  fontSize: "14px",
};

const formInputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  fontSize: "14px",
};

const formButtonStyle = {
  background: "#007BFF",
  color: "#fff",
  padding: "10px 15px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Home;
