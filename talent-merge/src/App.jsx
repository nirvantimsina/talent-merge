import Navbar from "./NavBar";
import axios from "axios";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import GetStarted from "./GetStarted";
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}