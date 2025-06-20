import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css'
import './ContactPage.css';

function Contact() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact", form);
      
      alert("Message sent successfully!");
      setForm({ name: "", contact: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className=" mainAbout">
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
              <Link to="/Contact"><button>Contact</button></Link>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="contact-wrapper">
          {/* Contact Header */}
          <section className="contact-section py-5 animate__animated animate__fadeIn">
            <div className="container text-center">
              <h2 className="fw-bold mb-2">CONTACT US</h2>
              <p className="lead">Get in Touch, We Cherish all Interactions</p>
            </div>
          </section>

          {/* Contact Info */}
          <section className="contact-info-banner py-5 animate__animated animate__fadeInUp">
            <div className="container d-flex justify-content-center gap-5 flex-wrap">
              <div className="info-bubble text-center">
                <h5 className="fw-bold">CONTACT NUMBER</h5>
                <p className="fs-5">+91 9250534906</p>
              </div>
              <div className="info-bubble text-center">
                <h5 className="fw-bold">EMAIL</h5>
                <p className="fs-5">info@deltawaresolution.com</p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section py-5">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-md-8 animate__animated animate__fadeInUp">
                  <div className="form-card p-4 rounded-4 shadow">
                    <h5 className="fw-bold mb-4 text-center">Please Share Some Information here</h5>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Your Name" required name="name" value={form.name} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input type="tel" className="form-control" placeholder="Mobile Number" required name="contact" value={form.contact} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Email Address" required name="email" value={form.email} onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Comment or Message</label>
                        <textarea className="form-control" rows="4" placeholder="Your Message..." required name="message" value={form.message} onChange={handleChange}></textarea>
                      </div>
                      <button type="submit" className="buttonsubmitd btn send-btn w-100">SEND</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="map-section mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.803873681905!2d80.33901617554618!3d25.47822362026047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ccf0021770815%3A0x3175f81a7a21b86c!2sDeltaware%20solution%20Private%20limited!5e0!3m2!1sen!2sin!4v1749805373716!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Deltaware Map"
              className="w-100 border-0 map-frame"
              style={{ height: '400px' }}
            ></iframe>
          </section>
        </div>
      </section>

      <footer>
        <div className="container pt-5 pb-4">
          <div className=" topfooter row">
            <div className="col-12 col-sm-10">
              <h2 className="text-sm-start text-center"> <span>From Coding to Security</span>, Supporting You at Every Step.</h2>
            </div>
            <div className="butfooter  col-12 col-sm-2 d-flex justify-content-center align-items-center pt-sm-0 pt-3">
              <button><Link to="/Enroll">ENROLL</Link></button>
            </div>
          </div>

          <div className="row d-flex align-items-center justify-content-around pt-5 ">
            <div className="col-12 pb-5 col-sm-4 d-flex align-items-center  col-md-4">
              <div className="footerlogoimg w-100 d-flex justify-content-center align-items-center ">
                <img className="w-25 h-100 " src="/img/logo1.jpg" alt="" />
                <h1 className="pt-2 ps-3">Deltaware</h1>
              </div>
            </div>
            <div className="footerlink pt-1  pb-5 col-12 col-sm-4 text-sm-start  text-center col-md-4">
              <h2>Quick Links</h2>
              <ul className=" ps-2 list-unstyled">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Service">Services</Link></li>
                <li><Link to="/About">About Us</Link></li>
                <li><Link to="/Contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="pb-5  footerreach  col-12 col-sm-4 col-md-4 text-sm-start  text-center">
              <h2>Reach Us</h2>
              <div className="reachpwrap d-flex">
                <i className="pe-3 pt-1 bi bi-envelope me-2"></i>
                <p className="ps-1">info@deltawaresolution.com</p>
              </div>
              <div className="reachpwrap d-flex">
                <i className=" pe-3 pt-1 bi bi-geo-alt me-2"></i>
                <p className="ps-1">Kalu kuwan, Infront of natraj gali, Banda, Uttar Pradesh 210001</p>
              </div>
              <div className="reachpwrap d-flex">
                <i className="pe-3 pt-1 bi bi-telephone me-2"></i>
                <p className="ps-1">+91 9250534906</p>
              </div>
            </div>
          </div>
          <div className="copyright">
            <h2>deltawaresolution© 2025</h2>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
