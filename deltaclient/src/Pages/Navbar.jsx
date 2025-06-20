import React, { useState } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
function Navbar() {

    const [isOpen, setOpen] = useState(false);

    const clickopen = () => {
        setOpen(!isOpen);
    };


    return (
        <>
            <div className="main container-fluid">
                <div className="containerk">
                    <div className="row">
                        <div className="col-4  d-flex  align-items-center ">
                            <div className=" pt-2 pb-2 ps-2 logoimg w-25  h-100 ">
                                <img className='w-75  h-100 rounded-circle ' src='/img/logo1.jpg' alt="ok" />
                            </div>
                            <div className="logotitle ">
                                <h1 className='pt-1 '>Deltaware</h1>
                            </div>

                        </div>

                        <div className="col-8 pt-1 ham d-md-none text-end">
                            <div className="hamburger" onClick={clickopen}>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                {isOpen ? '' : ''}
                            </div>
                            {isOpen && (
                                <div className="togelmain">
                                    <ul className='  align-items-center justify-content-around w-100 list-unstyled'>
                                        <Link to="/" onClick={clickopen}><li>HOME</li></Link>
                                        <Link to="/About" onClick={clickopen}><li>ABOUT-US</li></Link>
                                        <Link to="/Service" onClick={clickopen}><li>CAREERS</li></Link>
                                        <Link to="/PhoneScrollView" onClick={clickopen}><li>SERVICES</li></Link>
                                        <Link to="/Contact" onClick={clickopen}><li>CONTACT</li></Link>
                                        <Link to="/Enroll" onClick={clickopen}><li>ENROLL</li></Link>
                                        

                                    </ul>

                                    <div className="toglecontact">
                                        <h2>CONTACT US</h2>
                                        
                                        <p>info@deltawaresolution.com</p>
                                        
                                    </div>
                                </div>


                            )}
                        </div>

                        <div className="col-8 d-flex ullist align-items-center">
                            <ul className='d-flex pt-4 align-items-center justify-content-around w-100 list-unstyled'>
                                <Link to="/"><li>HOME</li></Link>
                                <Link to="/About"><li>ABOUT-US</li></Link>
                                <Link to="/Service"><li>CAREERS</li></Link>
                                <Link to="/PhoneScrollView"><li>SERVICES</li></Link>
                                <Link to="/Contact"><li>CONTACT</li></Link>
                                <Link to="/Enroll"><li>ENROLL</li></Link>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;