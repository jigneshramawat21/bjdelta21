import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultHomeForm = {
  heroVideoUrl: "",
  about: {
    title: "",
    paragraphOne: "",
    paragraphTwo: "",
    numberOne: "",
    numberTwo: ""
  },
  footer: {
    paragraph: "",
    titleOne: "",
    titleTwo: ""
  },
  _id: null
};

const defaultServiceForm = {
  title: "",
  imageUrl: "",
  imageTitle: "",
  paragraph: "",
  _id: null
};

function HomeManage() {
  const [form, setForm] = useState(defaultHomeForm);
  const [allHomes, setAllHomes] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState(defaultServiceForm);

  useEffect(() => {
    fetchHomeData();
    fetchServices();
  }, []);

  const fetchHomeData = () => {
    axios.get("http://localhost:5000/api/home").then((res) => {
      setAllHomes(res.data);
    });
  };

  const fetchServices = () => {
    axios.get("http://localhost:5000/api/services").then((res) => {
      setServices(res.data);
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
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form._id) {
      axios.put(`http://localhost:5000/api/home/${form._id}`, form).then(() => {
        alert("Home Updated");
        setForm(defaultHomeForm);
        fetchHomeData();
      });
    } else {
      axios.post("http://localhost:5000/api/home", form).then(() => {
        alert("Home Created");
        setForm(defaultHomeForm);
        fetchHomeData();
      });
    }
  };

  const handleEdit = (item) => {
    const safeItem = {
      
      about: item.about || {
        title: "",
        paragraphOne: "",
        paragraphTwo: "",
        numberOne: "",
        numberTwo: ""
      },
      footer: item.footer || {
        paragraph: "",
        titleOne: "",
        titleTwo: ""
      },
      _id: item._id
    };
    setForm(safeItem);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this home entry?")) {
      axios.delete(`http://localhost:5000/api/home/${id}`).then(() => {
        fetchHomeData();
      });
    }
  };

  // ----- SERVICE FUNCTIONS -----

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    if (serviceForm._id) {
      axios
        .put(`http://localhost:5000/api/services/${serviceForm._id}`, serviceForm)
        .then(() => {
          alert("Service Updated");
          setServiceForm(defaultServiceForm);
          fetchServices();
        });
    } else {
      axios.post("http://localhost:5000/api/services", serviceForm).then(() => {
        alert("Service Created");
        setServiceForm(defaultServiceForm);
        fetchServices();
      });
    }
  };

  const handleServiceEdit = (service) => {
    setServiceForm(service);
  };

  const handleServiceDelete = (id) => {
    if (window.confirm("Delete this service?")) {
      axios.delete(`http://localhost:5000/api/services/${id}`).then(() => {
        fetchServices();
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Home Page</h2>
      <form onSubmit={handleSubmit}>


        <h4>About Section</h4>
        <input name="about.title" className="form-control mb-2" placeholder="About Title" value={form.about.title} onChange={handleChange} />
        <textarea name="about.paragraphOne" className="form-control mb-2" placeholder="Paragraph One" value={form.about.paragraphOne} onChange={handleChange} />
        <textarea name="about.paragraphTwo" className="form-control mb-2" placeholder="Paragraph Two" value={form.about.paragraphTwo} onChange={handleChange} />
        <input name="about.numberOne" className="form-control mb-2" placeholder="Number One" value={form.about.numberOne} onChange={handleChange} />
        <input name="about.numberTwo" className="form-control mb-2" placeholder="Number Two" value={form.about.numberTwo} onChange={handleChange} />

        <h4>Footer Section</h4>
        <input name="footer.titleOne" className="form-control mb-2" placeholder="Footer Title One" value={form.footer.titleOne} onChange={handleChange} />
        <input name="footer.titleTwo" className="form-control mb-2" placeholder="Footer Title Two" value={form.footer.titleTwo} onChange={handleChange} />
        <textarea name="footer.paragraph" className="form-control mb-2" placeholder="Footer Paragraph" value={form.footer.paragraph} onChange={handleChange} />

        <button type="submit" className="btn btn-success mt-2">
          {form._id ? "Update Home" : "Create Home"}
        </button>
      </form>

      <hr />
      <h3>All Home Entries</h3>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
          
            <th>About Title</th>
            <th>Para1</th>
            <th>Para2</th>
            <th>Numbers</th>
            <th>Footer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allHomes.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              
              <td>{item.about?.title || "-"}</td>
              <td>{item.about?.paragraphOne || "-"}</td>
              <td>{item.about?.paragraphTwo || "-"}</td>
              <td>{item.about?.numberOne || "-"} / {item.about?.numberTwo || "-"}</td>
              <td>
                {item.footer?.titleOne}, {item.footer?.titleTwo}<br />
                {item.footer?.paragraph}
              </td>
              <td>
                <button onClick={() => handleEdit(item)} className="btn btn-warning btn-sm me-1">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <h3>Service Section</h3>
      <form onSubmit={handleServiceSubmit}>
        <input
          name="title"
          placeholder="Service Title"
          className="form-control mb-2"
          value={serviceForm.title}
          onChange={handleServiceChange}
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          className="form-control mb-2"
          value={serviceForm.imageUrl}
          onChange={handleServiceChange}
        />
        <input
          name="imageTitle"
          placeholder="Image Title"
          className="form-control mb-2"
          value={serviceForm.imageTitle}
          onChange={handleServiceChange}
        />
        <textarea
          name="paragraph"
          placeholder="Paragraph"
          className="form-control mb-2"
          value={serviceForm.paragraph}
          onChange={handleServiceChange}
        />
        <button type="submit" className="btn btn-primary mb-3">
          {serviceForm._id ? "Update Service" : "Create Service"}
        </button>
      </form>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Image Title</th>
            <th>Paragraph</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={service._id}>
              <td>{index + 1}</td>
              <td>
                {service.imageUrl ? <img src={service.imageUrl} width="100" /> : "No Image"}
              </td>
              <td>{service.title}</td>
              <td>{service.imageTitle}</td>
              <td>{service.paragraph}</td>
              <td>
                <button onClick={() => handleServiceEdit(service)} className="btn btn-warning btn-sm me-1">Edit</button>
                <button onClick={() => handleServiceDelete(service._id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomeManage;
