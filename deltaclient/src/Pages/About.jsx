import React, { useEffect, useRef, useState } from "react";
import './About.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [footerData, setFooterData] = useState(null);

  // Refs for animated sections
  const heroRef = useRef(null);
  const aboutContentRef = useRef(null);
  const missionRef = useRef(null);
  const getInTouchRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    fetchAboutData();
    fetchFooterData();
  }, []);

  useEffect(() => {
    // Animate sections when they scroll into view
    const animateSection = (ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    };

    animateSection(heroRef);
    animateSection(aboutContentRef);
    animateSection(missionRef);
    animateSection(getInTouchRef);
    animateSection(footerRef);
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/about");
      setAboutData(response.data[0]);
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  };

  const fetchFooterData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/home");
      setFooterData(response.data[0]?.footer);
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
  };

  return (
    <div className="mainAbout">
      {/* Hero Section */}
      <div className="container-fluid p-0" ref={heroRef}>
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
            <h1 className="display-5 fw-bold">{aboutData?.sectionOne.titleOne || "Welcome to Deltaware"}</h1>
            <div className="servicebutton d-flex justify-content-center gap-3 mt-4 flex-wrap">
              <Link to="/"><button>Home</button></Link>
              <Link to="/About"><button>About</button></Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Info */}
      <section ref={aboutContentRef}>
        <div className="container">
          <h2 className="text-center our-mission my-5">{aboutData?.sectionTwo.sectionTwoTitle || "About Deltaware Solution"}</h2>
          <p className="text-center">
            {aboutData?.sectionOne.paragraph || "Welcome to Deltaware Solution Pvt Ltd, a leading name in cybersecurity and web development."}
          </p>
          <ul>
            <li><strong>At Deltaware Solution Pvt Ltd, we provide services:</strong></li>
            <li><strong>Cybersecurity Expertise:</strong> Advanced penetration testing, vulnerability assessments, and bug hunting to secure digital assets.</li>
            <li><strong>Web Application Security:</strong> Protecting web platforms from cyber threats with proactive security measures.</li>
            <li><strong>Web Development:</strong> Crafting high-performance websites and applications tailored to business needs.</li>
          </ul>
        </div>
      </section>

      {/* Mission and Contact Cards */}
      <section className="pt-5 pb-5">
        <div className="row justify-content-center g-4">
          <div className="col-md-6" ref={missionRef}>
            <div className="getintouch p-4 rounded-4 h-100">
              <h4 className="fw-bold mb-3">{aboutData?.sectionTwo.sectionThreeTitle || "Our Mission"}</h4>
              <p>{aboutData?.sectionTwo.paragraphOne || "Our mission is to fortify the digital landscape..."}</p>
              <p>{aboutData?.sectionTwo.paragraphTwo || "We believe in Integrity, Innovation and Excellence..."}</p>
              <p>{aboutData?.sectionTwo.paragraphThree || "With a team of highly skilled professionals..."}</p>
            </div>
          </div>

          <div className="col-md-4" ref={getInTouchRef}>
            <div className="getintouch p-4 rounded-4 h-100 d-flex flex-column justify-content-center align-items-start">
              <h5 className="fw-bold  mb-3">Get in Touch</h5>
              <p className="mb-2">Join us on our mission to build a safer and more secure digital world.</p>
              <p className="mb-2"><strong>Email:</strong> {aboutData?.sectionTwo.pointOne || "info@deltawaresolution.com"}</p>
              <p><strong>Phone:</strong> {aboutData?.sectionTwo.pointTwo || "+91 9250534906"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef}>
        <div className="container pt-5 pb-4">
          <div className="topfooter row">
            <div className="col-12 col-sm-10">
              <h2 className="text-sm-start text-center"><span>From Coding to Security</span>, Supporting You at Every Step.</h2>
            </div>
            <div className="butfooter col-12 col-sm-2 d-flex justify-content-center align-items-center pt-sm-0 pt-3">
              <button><Link to="/Enroll">ENROLL</Link></button>
            </div>
          </div>

          <div className="row d-flex align-items-center justify-content-around pt-5">
            <div className="col-12 pb-5 col-sm-4 d-flex align-items-center col-md-4">
              <div className="footerlogoimg w-100 d-flex justify-content-center align-items-center">
                <img className="w-25 h-100" src="/img/logo1.jpg" alt="" />
                <h1 className="pt-2 ps-3">Deltaware</h1>
              </div>
            </div>
            <div className="footerlink pt-1 pb-5 col-12 col-sm-4 text-sm-start text-center col-md-4">
              <h2>Quick Links</h2>
              <ul className="ps-2 list-unstyled">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Service">Services</Link></li>
                <li><Link to="/About">About Us</Link></li>
                <li><Link to="/Contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="pb-5 footerreach col-12 col-sm-4 col-md-4 text-sm-start text-center">
              <h2>Reach Us</h2>
              <div className="reachpwrap d-flex">
                <i className="pe-3 pt-1 bi bi-envelope me-2"></i>
                <p className="ps-1">{footerData?.paragraph || "info@deltawaresolution.com"}</p>
              </div>
              <div className="reachpwrap d-flex">
                <i className="pe-3 pt-1 bi bi-geo-alt me-2"></i>
                <p className="ps-1">{footerData?.titleOne || "Kalu kuwan, Infront of natraj gali, Banda, Uttar Pradesh 210001"}</p>
              </div>
              <div className="reachpwrap d-flex">
                <i className="pe-3 pt-1 bi bi-telephone me-2"></i>
                <p className="ps-1">{footerData?.titleTwo || "+91 9250534906"}</p>
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

export default About;
