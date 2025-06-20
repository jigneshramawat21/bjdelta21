import './App.css';
import Navbar from './Pages/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ScrollToTop from './ScrollToTop'


//pages
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Enroll from './Pages/Enroll';
import About from './Pages/About';
import Service from './Pages/Service';
import PhoneScrollView from './Pages/PhoneScrollView';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>  
      <ScrollToTop /> 
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Enroll" element={<Enroll />} />
        <Route path="/About" element={<About />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/PhoneScrollView" element={<PhoneScrollView />} />
      </Routes>
      </Router>
     

    </div>
  );
}

export default App;
