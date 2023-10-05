import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8081/student/delete/${id}`)
        .then((res) => {
          window.location.reload();
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-5">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            <tbody>
              {student.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <Link
                      to={`/update/${student.id}`}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={(e) => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Student;
