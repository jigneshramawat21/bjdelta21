import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultForm = {
  sectionOne: {
    titleOne: "",
    titleTwo: "",
    paragraph: "",
    pointTitle: "",
    point: ""
  },
  sectionTwo: {
    sectionTwoTitle: "",
    paragraphOne: "",
    paragraphTwo: "",
    paragraphThree: "",
    sectionThreeTitle: "",
    sectionThreeParagraph: "",
    pointOne: "",
    pointTwo: ""
  },
  _id: null
};

function AboutManage() {
  const [form, setForm] = useState(defaultForm);
  const [allAbouts, setAllAbouts] = useState([]);

  useEffect(() => {
    fetchAbouts();
  }, []);

  const fetchAbouts = () => {
    axios.get("https://bjdelta21.vercel.app/api/about").then((res) => {
      if (Array.isArray(res.data)) {
        setAllAbouts(res.data);
      } else {
        setAllAbouts([res.data]);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length === 2) {
      const [section, field] = keys;
      setForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form._id) {
      axios.put(`https://bjdelta21.vercel.app/api/about/${form._id}`, form).then(() => {
        alert("Updated Successfully");
        setForm(defaultForm);
        fetchAbouts();
      });
    } else {
      axios.post("https://bjdelta21.vercel.app/api/about", form).then(() => {
        alert("Created Successfully");
        setForm(defaultForm);
        fetchAbouts();
      });
    }
  };

  const handleEdit = (item) => {
    setForm({ ...item });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this entry?")) {
      axios.delete(`https://bjdelta21.vercel.app/api/about/${id}`).then(() => {
        fetchAbouts();
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage About</h2>
      <form onSubmit={handleSubmit}>
        <h4>Section One</h4>
        <input name="sectionOne.titleOne" className="form-control mb-2" placeholder="Title One" value={form.sectionOne.titleOne} onChange={handleChange} />
        <input name="sectionOne.titleTwo" className="form-control mb-2" placeholder="Title Two" value={form.sectionOne.titleTwo} onChange={handleChange} />
        <textarea name="sectionOne.paragraph" className="form-control mb-2" placeholder="Paragraph" value={form.sectionOne.paragraph} onChange={handleChange} />
        <input name="sectionOne.pointTitle" className="form-control mb-2" placeholder="Point Title" value={form.sectionOne.pointTitle} onChange={handleChange} />
        <input name="sectionOne.point" className="form-control mb-2" placeholder="Point" value={form.sectionOne.point} onChange={handleChange} />

        <h4>Section Two</h4>
        <input name="sectionTwo.sectionTwoTitle" className="form-control mb-2" placeholder="Section Two Title" value={form.sectionTwo.sectionTwoTitle} onChange={handleChange} />
        <textarea name="sectionTwo.paragraphOne" className="form-control mb-2" placeholder="Paragraph One" value={form.sectionTwo.paragraphOne} onChange={handleChange} />
        <textarea name="sectionTwo.paragraphTwo" className="form-control mb-2" placeholder="Paragraph Two" value={form.sectionTwo.paragraphTwo} onChange={handleChange} />
        <textarea name="sectionTwo.paragraphThree" className="form-control mb-2" placeholder="Paragraph Three" value={form.sectionTwo.paragraphThree} onChange={handleChange} />
        <input name="sectionTwo.sectionThreeTitle" className="form-control mb-2" placeholder="Section Three Title" value={form.sectionTwo.sectionThreeTitle} onChange={handleChange} />
        <textarea name="sectionTwo.sectionThreeParagraph" className="form-control mb-2" placeholder="Section Three Paragraph" value={form.sectionTwo.sectionThreeParagraph} onChange={handleChange} />
        <input name="sectionTwo.pointOne" className="form-control mb-2" placeholder="Point One" value={form.sectionTwo.pointOne} onChange={handleChange} />
        <input name="sectionTwo.pointTwo" className="form-control mb-4" placeholder="Point Two" value={form.sectionTwo.pointTwo} onChange={handleChange} />

        <button type="submit" className="btn btn-success">{form._id ? "Update" : "Create"}</button>
      </form>

      <hr />
      <h3>All About Entries</h3>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Title One</th>
            <th>Title Two</th>
            <th>Paragraph</th>
            <th>Point Title</th>
            <th>Point</th>
            <th>Section Two Title</th>
            <th>Para1</th>
            <th>Para2</th>
            <th>Para3</th>
            <th>Sec3 Title</th>
            <th>Sec3 Para</th>
            <th>Point One</th>
            <th>Point Two</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allAbouts.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.sectionOne.titleOne}</td>
              <td>{item.sectionOne.titleTwo}</td>
              <td>{item.sectionOne.paragraph}</td>
              <td>{item.sectionOne.pointTitle}</td>
              <td>{item.sectionOne.point}</td>
              <td>{item.sectionTwo.sectionTwoTitle}</td>
              <td>{item.sectionTwo.paragraphOne}</td>
              <td>{item.sectionTwo.paragraphTwo}</td>
              <td>{item.sectionTwo.paragraphThree}</td>
              <td>{item.sectionTwo.sectionThreeTitle}</td>
              <td>{item.sectionTwo.sectionThreeParagraph}</td>
              <td>{item.sectionTwo.pointOne}</td>
              <td>{item.sectionTwo.pointTwo}</td>
              <td>
                <button onClick={() => handleEdit(item)} className="btn btn-warning btn-sm me-1">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AboutManage;
