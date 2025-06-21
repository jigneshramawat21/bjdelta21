import React, { useEffect, useRef, useState } from 'react';
import './PhoneScrollView.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import "./Slider.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gImg from '../imgs/s1.png';
import gImg2 from '../imgs/s2.png';
import gImg3 from '../imgs/s5.jpg';
import gImg4 from '../imgs/s6.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: gImg, title: "Web Development" },
  { src: gImg2, title: "Cybersecurity" },
  { src: gImg3, title: "AI/ML" },
  { src: gImg, title: "Web Development" },
  { src: gImg4, title: "Cloud Computing" },
  { src: gImg2, title: "Cybersecurity" }
];

const services = [


  {
    title: "Cybersecurity",
    summary: "Protect your digital assets with modern security practices and auditing.",
    image: gImg2,
    points: [
      "Penetration Testing",
      "Vulnerability Management",
      "Data Encryption",
      "24/7 Monitoring"
    ]
  },

  
  {
    title: "Web Development",
    summary: "We create modern, responsive, and scalable web applications tailored to your business needs.",
    image: gImg,
    points: [
      "Full Stack Development",
      "SEO Optimized Structure",
      "Fast Loading and Secure",
      "Mobile-Friendly Design"
    ]
  },
  {
    title: "AI / ML",
    summary: "We build intelligent systems powered by machine learning to automate processes and deliver insights.",
    image: gImg3,
    points: [
      "Custom ML Models",
      "Predictive Analytics",
      "Data Cleaning and Training",
      "Real-time Inference"
    ]
  },
  {
    title: "Cloud Computing",
    summary: "Leverage scalable and secure cloud infrastructure to power your applications.",
    image: gImg4,
    points: [
      "AWS, Azure, GCP Integration",
      "Serverless Architecture",
      "DevOps and CI/CD",
      "High Availability"
    ]
  }

];

const PhoneScrollView = () => {
  const swiperRef = useRef(null);
  const imageRefs = useRef([]);
  const devSectionRefs = useRef([]);

  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await axios.get("https://bjdelta21.vercel.app/api/home");
      setHomeData(response.data[0]);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  const handleMouseMove = (e, index) => {
    const card = imageRefs.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (index) => {
    imageRefs.current[index].style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  useEffect(() => {
    devSectionRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ref,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
  }, [services]);

  return (
    <div className="serv-main">
      {/* Hero + Swiper Section */}
      <section>
        <div className="herosectionclass">
          <div className="herotextsection">
            <h2>We Provide Service's Web Development , Cybersecurity , AI/ML , Cloud Computing </h2>
            <p>info@deltawaresolution.com</p>
          </div>

          <div className="animationimagesection">
            <div className='scrollsections'>
              <main>
                <div className="containerji">
                  <div className="scroolconjitag">
                    <h3>Service's </h3>
                  </div>

                  <Swiper
                    modules={[Autoplay, Mousewheel, Pagination]}
                    grabCursor={true}
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    speed={3000}
                    autoplay={{ delay: 100, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    mousewheel={{ thresholdDelta: true }}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      768: { slidesPerView: 'auto' }
                    }}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper.wrapperEl;
                    }}
                    onSlideChange={(swiper) => {
                      const activeSlide = swiper.slides[swiper.activeIndex];
                      gsap.fromTo(
                        activeSlide,
                        { scale: 1.3 },
                        { scale: 1, duration: 0.8, ease: "back.out(1.7)" }
                      );
                    }}
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index} className="swiper-slide">
                        <div className="swiper-slide-content">
                          <img src={image.src} alt={image.title} className="img-fluid" />
                          <p>{image.title}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* Who is using section */}
      <section className="who-using-section py-5">
        <div className="container text-center">
          <h2 className="section-title mb-5">Who is Using Our Service?</h2>
          <div className="row justify-content-center">
            {["who.webp", "who3.webp", "who2.webp"].map((img, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="client-card d-flex justify-content-center align-items-center">
                  <img src={`./img/${img}`} alt={`Client ${i + 1}`} />
                </div>
                <p className="client-name mt-3">{["E-Commerce Companies", "Healthcare Startups", "Students"][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.map((service, index) => (
        <section
          className="dev-section py-5"
          key={index}
          ref={(el) => (devSectionRefs.current[index] = el)}
        >
          <div className="container">
            <div className={`row align-items-center ${index % 2 !== 0 ? 'flex-md-row-reverse' : ''}`}>
              <div className="col-md-6 mb-4 mb-md-0">
                <div
                  className="tilt-container"
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => resetTilt(index)}
                >
                  <img
                    ref={(el) => (imageRefs.current[index] = el)}
                    src={service.image}
                    alt={service.title}
                    className="img-fluid tilt-img"
                  />
                </div>
              </div>
              <div className="col-md-6 text-content">
                <h2 className="section-title">{service.title}</h2>
                <p className="section-summary">{service.summary}</p>
                <ul className="feature-list">
                  {service.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
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
};

export default PhoneScrollView;
