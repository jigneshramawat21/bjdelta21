import React, { useEffect, useRef, useState } from "react";
import './Home.css';
import { Link } from "react-router-dom";
import axios from "axios";
import 'animate.css';
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

gsap.registerPlugin(ScrollTrigger);

const images = [
    { src: gImg, title: "Web Development" },
    { src: gImg2, title: "Cybersecurity" },
    { src: gImg3, title: "AI/ML" },
    { src: gImg, title: "Web Development" },
    { src: gImg4, title: "Cloud Computing" },
    { src: gImg2, title: "Cybersecurity" }
];

const courseList = [
    { code: "BTECH", fullForm: "Bachelor of Technology" },
    { code: "BCA", fullForm: "Bachelor of Computer Applications" },
    { code: "MCA", fullForm: "Master of Computer Applications" },
    { code: "MTECH", fullForm: "Master of Technology" }
];

function Home() {
    const [homeData, setHomeData] = useState(null);
    const [services, setServices] = useState([]);

    const swiperRef = useRef(null);
    const aboutRef = useRef(null);
    const servicesRef = useRef(null);
    const joinRef = useRef(null);
    const applyRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        fetchHomeData();
        fetchServiceData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/home");
            setHomeData(response.data[0]);
        } catch (error) {
            console.error("Error fetching home data:", error);
        }
    };

    const fetchServiceData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/homeservices");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching service data:", error);
        }
    };

    function adjustMargin() {
        const screenWidth = window.innerWidth;
        if (swiperRef.current) {
            swiperRef.current.style.marginLeft =
                screenWidth < 600 ? "-75px" : screenWidth <= 900 ? "-90px" : "-150px";
        }
    }

    // GSAP Scroll Animations
    useEffect(() => {
        const animateSection = (ref) => {
            if (ref.current) {
                gsap.fromTo(
                    ref.current,
                    { opacity: 0, y: 200 },
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

        animateSection(aboutRef);
        animateSection(servicesRef);
        animateSection(joinRef);
        animateSection(applyRef);
        animateSection(footerRef);
    }, []);

    return (
        <div className="mainHome">
            {/* HERO SECTION */}
            <div className="containerk p-0 m-0">
                <div className="row pt-5">
                    <div className="col-12 h-100">
                        <div className="animationimagesection">
                            <div className='scrollsections'>
                                <main>
                                    <div className="containerji">
                                        <Swiper
                                            modules={[Autoplay, Mousewheel, Pagination]}
                                            grabCursor={true}
                                            loop={true}
                                            centeredSlides={true}
                                            slidesPerView={"auto"}
                                            spaceBetween={10}
                                            speed={3000}
                                            autoplay={{
                                                delay: 100,
                                                disableOnInteraction: false
                                            }}
                                            pagination={{ clickable: true }}
                                            mousewheel={{ thresholdDelta: true }}
                                            breakpoints={{
                                                320: { slidesPerView: 1 },
                                                768: { slidesPerView: 'auto' }
                                            }}
                                            onSwiper={(swiper) => {
                                                swiperRef.current = swiper.wrapperEl;
                                                swiper.on('resize', adjustMargin);
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
                                                <SwiperSlide key={index} className="swiperjiok swiper-slide">
                                                    <div className="swiper-slide-content">
                                                        <img src={image.src} alt={image.title} className="imghomepageslide img-fluid" />
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
                </div>
            </div>

            {/* ABOUT SECTION */}
            <div className="mainsectiontwo" ref={aboutRef}>
                <div className="container w-100 h-100">
                    <div className="row pt-5">
                        <div className="col-lg-6 col-sm-12 ps-lg-5 pt-5">
                            <h3 className="pb-4">{homeData?.about?.title || "ABOUT-US"}</h3>
                            <p>{homeData?.about?.paragraphOne}</p>
                            <p>{homeData?.about?.paragraphTwo}</p>
                        </div>
                        <div className="col-lg-6 col-sm-12 proabout pb-5 pt-5 ps-lg-4">
                            <div className="Aboutimg1 d-block mb-3 w-100">
                                <h4 className="pt-5">Total Projects</h4>
                                <h3>{homeData?.about?.numberOne}</h3>
                            </div>
                            <div className="Aboutimg2 d-block w-100">
                                <h4 className="pt-5">Happy Customers</h4>
                                <h3>{homeData?.about?.numberTwo}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SERVICES SECTION */}
            <div className="mainservises" ref={servicesRef}>
                <div className="container pt-5">
                    <div className="servicesboxrow align-items-center justify-content-around">
                        <h1 className="pb-5">OUR-SERVICES</h1>
                        <div className="servicesCardwrap p-5 row">
                            {services.map((service, index) => (
                                <div className="servicemanbox pt-5 col-md-2 col-sm-6" key={index}>
                                    <div className="servicesimgbox w-100">
                                        <div className="servicesimg d-flex align-items-center justify-content-around w-100">
                                            <img className="w-75 h-75" src={service.imageUrl} alt={service.imageTitle} />
                                        </div>
                                        <div className="servicestitle text-center">
                                            <h3 className="pt-2">{service.title}</h3>
                                            <p className="pt-2 text-white">{service.paragraph}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="servicebutoon text-center mt-4">
                            <button><Link to="/Service">SERVICES</Link></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHO CAN JOIN SECTION */}
            <div className="how container" ref={joinRef}>
                <div className="row howbox pt-5 pb-5 d-flex align-items-center justify-content-around">
                    <div className="howtowrap col-12 col-md-6">
                        <h2>Who</h2>
                        <h2>Can</h2>
                        <h2>JOIN</h2>
                        <p>info@deltawaresolution.com</p>
                    </div>
                    <div className="abc col-12 col-md-6 text-white">
                        {courseList.map((course, idx) => (
                            <div className="stepaply hover-card p-2 d-flex flex-row align-items-start" key={idx}>
                                <div className="onestepwrap1"><h2 className="pt-1">{course.code}</h2></div>
                                <p className="ps-5 pt-4 pt-md-1 fullform-text">{course.fullForm}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HOW TO APPLY SECTION */}
            <div className="how container" ref={applyRef}>
                <div className="row howbox d-flex align-items-center justify-content-around">
                    <div className="howtowrap col-12 col-md-6">
                        <h2>HOW</h2>
                        <h2>TO</h2>
                        <h2>APPLY</h2>
                        <p>info@deltawaresolution.com</p>
                    </div>
                    <div className="abc col-12 col-md-6">
                        {[
                            "Fill out our quick and easy application form to get started.",
                            "Our team will review your application and reach out.",
                            "Get ready to embark on a new learning adventure!"
                        ].map((step, index) => (
                            <div
                                className={`stepaply animate__animated animate__fadeInUp p-2 d-flex flex-row align-items-start animate__delay-${index + 1}s`}
                                key={index}
                            >
                                <div className="onestepwrap"><h2>{index + 1}</h2></div>
                                <p className="ps-3 pt-2">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FOOTER */}
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

function getFullForm(course) {
    switch (course) {
        case "BTECH": return "Bachelor of Technology";
        case "BCA": return "Bachelor of Computer Applications";
        case "MCA": return "Master of Computer Applications";
        case "MTECH": return "Master of Technology";
        default: return "";
    }
}

export default Home;
