import React, { useEffect, useState } from "react";
import axios from "axios";

function EnrollManage() {
  const [enrolls, setEnrolls] = useState([]);

  useEffect(() => {
    axios.get("https://bjdelta21.vercel.app/api/enroll")
      .then((res) => setEnrolls(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Enroll Submissions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Gender</th><th>Contact</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {enrolls.map((e, i) => (
            <tr key={i}>
              <td>{e.name}</td>
              <td>{e.gender}</td>
              <td>{e.contact}</td>
              <td>{e.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnrollManage;
