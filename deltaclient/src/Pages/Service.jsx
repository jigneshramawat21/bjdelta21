import React, { useEffect, useRef, useState } from "react";
import './About.css';
import './Services.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Service() {
  const [cards, setCards] = useState([]);
  const [footerData, setFooterData] = useState(null);

  // Refs for animations
  const headerRef = useRef(null);
  const paraRef = useRef(null);
  const cardsRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    fetchCards();
    fetchFooterData();
  }, []);

  useEffect(() => {
    // Animate Heading
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animate Paragraph
    if (paraRef.current) {
      gsap.fromTo(
        paraRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          scrollTrigger: {
            trigger: paraRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animate each card
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      }
    });

    // Animate footer
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, [cards]);

  const fetchCards = async () => {
    try {
      const res = await axios.get("https://bjdelta21.vercel.app/api/services");
      setCards(res.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  const fetchFooterData = async () => {
    try {
      const response = await axios.get("https://bjdelta21.vercel.app/api/home");
      setFooterData(response.data[0]?.footer);
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
  };

  return (
    <div className="mainAbout">
      {/* Banner Section */}
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
              <Link to="/Service"><button>Service</button></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Career Section */}
      <section>
        <div className="container py-5">
          <h2
            className="text-center mb-5 fw-bold"
            ref={headerRef}
          >
            CAREERS
          </h2>

          <div className="row justify-content-center mb-5">
            <div className="col-lg-10 text-center">
              <p className="lead" ref={paraRef}>
                Don't miss out on the opportunity to become a skilled person. Sign up for one of our courses today and start your journey toward a rewarding career in technology.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <div className="col-md-6 col-lg-4" key={card._id} ref={(el) => (cardsRef.current[index] = el)}>
                  <div className="career-card shadow rounded p-3 h-100">
                    <div className="imgwrapser pb-3">
                      <img src={card.imageUrl} alt={card.title} className="career-image w-100" />
                    </div>
                    <h5 className="fw-bold mb-2">{card.title}</h5>
                    <p>{card.description}</p>
                    {Array.isArray(card.points) && card.points.length > 0 ? (
                      <ul>
                        {card.points.map((point, i) => <li key={i}>{point}</li>)}
                      </ul>
                    ) : (
                      <p><em>No points listed.</em></p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No services available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef}>
        <div className="container pt-5 pb-4">
          <div className="topfooter row">
            <div className="col-12 col-sm-10">
              <h2 className="text-sm-start text-center">
                <span>From Coding to Security</span>, Supporting You at Every Step.
              </h2>
            </div>
            <div className="butfooter col-12 col-sm-2 d-flex justify-content-center align-items-center pt-sm-0 pt-3">
              <button><Link to="/Enroll">ENROLL</Link></button>
            </div>
          </div>

          <div className="row d-flex align-items-center justify-content-around pt-5">
            <div className="col-12 pb-5 col-sm-4 d-flex align-items-center col-md-4">
              <div className="footerlogoimg w-100 d-flex justify-content-center align-items-center">
                <img className="w-25 h-100" src="/img/logo1.jpg" alt="Delta Logo" />
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
                <p className="ps-1">{footerData?.titleOne || "Kalu kuwan, Banda, Uttar Pradesh 210001"}</p>
              </div>
              <div className="reachpwrap d-flex">
                <i className="pe-3 pt-1 bi bi-telephone me-2"></i>
                <p className="ps-1">{footerData?.titleTwo || "+91 9250534906"}</p>
              </div>
            </div>
          </div>

          <div className="copyright">
            <h2>deltawaresolution 2025</h2>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Service;
