import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './Enroll.css';

function Enroll() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    contact: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [statusMsg, setStatusMsg] = useState("");
   const [homeData, setHomeData] = useState(null);
     useEffect(() => {
           fetchHomeData();
       }, []);
       const fetchHomeData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/home");
            setHomeData(response.data[0]);
        } catch (error) {
            console.error("Error fetching home data:", error);
        }
    };
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!/^(?:\+91)?[6-9]\d{9}$/.test(formData.contact)) errs.contact = 'Enter valid Indian mobile number';
    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) errs.email = 'Enter valid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/enroll", formData);  // 👈 Adjust URL if needed
      console.log("Response:", response.data);
      setStatusMsg("✅ Successfully submitted!");
      setFormData({ name: '', gender: '', contact: '', email: '' });
    } catch (error) {
      console.error("Error:", error);
      setStatusMsg("❌ Submission failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mainAbout">
      {/* Banner */}
      <div className="container-fluid p-0">
        <div className="position-relative text-white">
          <img
            src="/img/welimgab.jpg"
            alt="welcome"
            className="img-fluid w-100"
            style={{
              height: '400px',
              objectFit: 'cover',
              filter: 'brightness(30%)',
            }}
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center px-3">
            <h1 className="display-5 fw-bold">Welcome to Deltaware</h1>
            <div className="servicebutton d-flex justify-content-center gap-3 mt-4 flex-wrap">
              <Link to="/"><button>Home</button></Link>
              <Link to="/Enroll"><button>Enroll</button></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="contact-wrapper">
        <section className="contact-form-section py-5 animate__animated animate__fadeInUp">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-10">
                <div className="enroll-card d-flex flex-wrap rounded-4 shadow position-relative">

                  {/* Left Panel */}
                  <div className="left-info p-4 text-white">
                    <h4 className="text-enrollok fw-bold">Please Share Some Details Here</h4>
                    <p className="text-enrollok">Welcome User!<br />Enter your personal details for registration</p>
                    <p  className="pt-3 text-enrollok">Sign In Here</p>
                  </div>

                  {/* Right Panel */}
                  <div className="right-form p-4 position-relative">
                    <div className="corner-fold"></div>
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                      </div>

                      <div className="mb-3">
                        <label className="form-label me-3">Gender:</label>
                        {['Male', 'Female', 'Others'].map(gender => (
                          <div className="form-check form-check-inline" key={gender}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              value={gender}
                              checked={formData.gender === gender}
                              onChange={handleChange}
                            />
                            <label className="form-check-label">{gender}</label>
                          </div>
                        ))}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input type="tel" name="contact" className="form-control" placeholder="Mobile Number" value={formData.contact} onChange={handleChange} />
                        {errors.contact && <small className="text-danger">{errors.contact}</small>}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                      </div>

                      <button type="submit" className="btn enroll-btn w-100 fw-bold">SIGN UP</button>
                    </form>
                    {statusMsg && <p className="mt-3 text-center">{statusMsg}</p>}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </section>


            {/* FOOTER */}
            <footer>
                <div className="container pt-5 pb-4">
                    <div className="topfooter row">
                        <div className="col-12 col-sm-10">
                            <h2 className="text-sm-start text-center"><span>From Coding to Security</span>, Supporting You at Every Step.</h2>
                        </div>
                        <div className="butfooter col-12 col-sm-2 d-flex justify-content-center align-items-center pt-sm-0 pt-3">
                            <button><Link to="/Enroll">ENROLL</Link></button>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-around pt-5">
                        <div className="col-12 col-sm-4 d-flex align-items-center">
                            <img className="footerimage w-25 h-100" src="/img/logo1.jpg" alt="Logo" />
                            <h1 className="pt-2 ps-3 footerdeltaname">Deltaware</h1>
                        </div>
                        <div className="footerlink col-12 col-sm-4 text-sm-start text-center">
                            <h2>Quick Links</h2>
                            <ul className="ps-2 list-unstyled">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/Service">Services</Link></li>
                                <li><Link to="/About">About Us</Link></li>
                                <li><Link to="/Contact">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="footerreach col-12 col-sm-4 text-sm-start text-center">
                            <h2>Reach Us</h2>
                            <p><i className="bi bi-envelope"></i> {homeData?.footer?.paragraph}</p>
                            <p><i className="bi bi-geo-alt"></i> {homeData?.footer?.titleOne}</p>
                            <p><i className="bi bi-telephone"></i> {homeData?.footer?.titleTwo}</p>
                        </div>
                    </div>
                    <div className="copyright text-center mt-4">
                        <h2> deltawaresolution © 2025</h2>
                    </div>
                </div>
            </footer>
    </div>
  );
}

export default Enroll;
