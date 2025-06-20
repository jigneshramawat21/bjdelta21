import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceManage = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    points: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all cards
  const fetchCards = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setCards(res.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or update card
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        points: formData.points.split(",").map((p) => p.trim()),
      };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/services/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/services", payload);
      }

      setFormData({
        title: "",
        imageUrl: "",
        points: "",
        description: "",
      });
      fetchCards();
    } catch (err) {
      console.error("Error submitting card:", err);
    }
  };

  // ✅ Edit card
  const handleEdit = (card) => {
    setFormData({
      title: card.title,
      imageUrl: card.imageUrl,
      points: card.points.join(", "),
      description: card.description,
    });
    setEditingId(card._id);
  };

  // ✅ Delete card
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this card?")) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${id}`);
        fetchCards();
      } catch (err) {
        console.error("Error deleting card:", err);
      }
    }
  };

  return (
    <div className="container py-4">
      <h2>{editingId ? "Update Card" : "Add New Card"}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="points"
          placeholder="Points (comma separated)"
          value={formData.points}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="form-control mb-2"
        ></textarea>
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Add"} Card
        </button>
      </form>

      <h3>All Cards</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Points</th>
            <th>Description</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card._id}>
              <td>{card.title}</td>
              <td>
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  style={{ width: "80px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>
                <ul>
                  {card.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </td>
              <td>{card.description}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(card)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(card._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceManage;
