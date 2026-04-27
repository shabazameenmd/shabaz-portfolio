import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoIntro from '../components/VideoIntro';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <VideoIntro />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
