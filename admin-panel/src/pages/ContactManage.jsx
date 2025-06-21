import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactManage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("https://bjdelta21.vercel.app/api/contact")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Contact Submissions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Contact</th><th>Email</th><th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.contact}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactManage;
