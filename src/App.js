import  React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pic1 from "./assets/Me1.JPG";
import pic2 from "./assets/Me2.JPG";
import pic3 from "./assets/Me3.JPG";
import pic4 from "./assets/Me4.JPG";
import portfolioimg from "./assets/Portfolio.png";
import modeldemo from "./assets/ModelDemo.gif";
import motiondemo from "./assets/MotionTrack.gif";
import tetrisdemo from "./assets/TetrisDemo.png";
import gamedemo from "./assets/GameDemo.gif";
import {AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail} from "react-icons/ai";
import './App.css';

function App() {
  const images = [pic1, pic2, pic3, pic4];
  const [currentImage, setCurrentImage] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(null);
  const [blurb, setBlurb] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 600);
  const [isTablet, setIsTablet] = React.useState(window.innerWidth > 600 && window.innerWidth <= 1024);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    function handleResize() {
      setIsMobile(window.innerWidth <= 600);
      setIsTablet(window.innerWidth > 600 && window.innerWidth <= 1024);
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <div className="App">
      <motion.header
        className="App-header"
        animate={{
          x: activeTab === "About Me"
            ? isMobile
              ? "0vw"
              : isTablet
                ? "33vw"
                : "35vw"
            : activeTab
              ? isMobile
                ? "0vw"
                : isTablet
                  ? "-33vw" 
                  : "-35vw"
              : "0vw",
          width: activeTab
            ? isTablet
              ? "30vw"
              : isMobile
                ? "80vw"
                : "20vw"
            : isTablet
              ? "60vw"
              : isMobile
                ? "80vw"
                : "35vw"
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="back-button-container"
          animate={{
            translateX: activeTab === "About Me"
              ? (isMobile ? "-25vw" : "-6vw")
              : (isMobile ? "-25vw" : "6vw"),
            opacity: activeTab ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <BackButton setActiveTab={setActiveTab}/>
        </motion.div>

        <motion.div 
          className="title-container"
          animate={{
            y: activeTab
              ? isMobile
                ? "22vh"
                : isTablet
                  ? "32vh"
                  : "40vh"
              : isMobile
                ? "1vh"
                : isTablet
                  ? "1vh"
                  : "2vh",
            scale: activeTab ? 0.8 : 1
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h1 className="title">Brian D. Bui</h1>
          <h4 className="subtitle">Student at George Mason University <br />Candidate for M.S. Computer Science</h4>
        </motion.div>
        
        <motion.div
          className="main-circle"
          animate={{
            translateY: activeTab
              ? isMobile
                ? "-10vh"
                : isTablet
                  ? "-10vh"
                  : "-15vh"
              : "0vh",
            scale: activeTab ? 0.8 : 1
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <AnimatePresence>
              <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="It's me!"
                  className="fade-image"
                  initial={{ opacity: 0}}
                  animate={{ opacity: 1}}
                  exit={{ opacity: 0 }}
                  transition={{duration: 3}}
              />
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {!activeTab && (
            <>
              <motion.div 
                className="tabs-container"
                initial={{opacity: 1}}
                animate={{opacity:1}}
                exit={{opacity: 0}}
                transition={{ duration: 0.5 }}
              >
                <Tab label="About Me" route="./about" setActiveTab={setActiveTab} setBlurb={setBlurb}/>
                <Tab label="Projects" route="./projects" setActiveTab={setActiveTab} setBlurb={setBlurb}/>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          className="resume-container"
          animate={{
            scale: activeTab ? 0.8 : 1,
            y: activeTab
              ? isMobile
                ? "5.5vh"
                : isTablet
                  ? "18vh"
                  : "6vh"
              : isMobile
                ? "2vh"
                : isTablet
                  ? "4vh"
                  : "2vh"
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Resume />
        </motion.div>

        <AnimatePresence>
          {!activeTab && (
            <>
              <SkillCarousel />
            </>
          )}
        </AnimatePresence>

        <motion.div
          className="socials-container"
          animate={{
            translateY: activeTab ? "0vh" : "2vh",
            opacity: activeTab ? isMobile ? 0 : 1 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Socials />
        </motion.div>
      </motion.header>

      <motion.p
          className="blurb"
          animate={{
            opacity: activeTab ? 1 : 0,
            x: activeTab === "About Me"
              ? isMobile
                ? "0vw"
                : isTablet
                  ? "-15vw"
                  : "-11vw"
              : activeTab
                ? isMobile
                  ? "0vw"
                  : isTablet
                    ? "7vw"
                    : "11vw"
                : "0vw",
            y: isMobile
              ? "0vh"
              : isTablet
                ? "1vh"
                : "0vh"
          }}
          transition={{ duration: 1 }}
      >
        {Array.isArray(blurb)
          ? blurb.map((para, idx) => <p key={idx}>{para}</p>)
          : blurb
        }
        {activeTab === "Projects" && <ProjectGrid />}
      </motion.p>
    </div>
  );
}

function Tab({ label, setActiveTab, setBlurb }) {
  const handleClick = () => {
    setActiveTab(label);
  
    if (label === "About Me") {
      setBlurb([
        "Hello! My name is Brian Bui, I am a student at George Mason University, pursuing a Master's degree in Computer Science. I earned my Bachelor's degree in Biology at the University of Virginia. As a developer, I am currently delving into all matters of AI and Machine Learning.",
        "This summer of 2025 I have earned my AWS Cloud Practitioner Certification, and I plan on earning AWS AI Practitioner and AWS Certified Developer certifications.",
        "Please feel free to reach out and connect with me on LinkedIn or GitHub. I am always open to discussing new projects, collaborations, or opportunities in the tech industry."
      ]);
    } else if (label === "Projects") {
      setBlurb("Here are some of my projects that showcase my skills in software and game development.");
    }
  };
  
  return (
    <motion.div
      className="tab"
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >  
        {label}    
    </motion.div>
  );
}

function Resume() {
  return (
    <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">
      <button>Resume</button>
    </a>
  );
}

function BackButton({ setActiveTab }) {
  return (
      <button onClick={() => setActiveTab(null)}>Back</button>
  );
}

function SkillCarousel() {
  const skills = [
    {name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"},
    {name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"},
    {name: "C", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg"},
  ];
  return (
    <div className="carousel-container">
      <div className="carousel">
          {skills.map((skill, index) => (
          <img key={index} src={skill.src} alt={skill.name} className="skill-icon" />
         ))}
      </div>
    </div>
  );
}

function Socials() {
  return (
    <>
      <a
        href="https://github.com/bbui57"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <AiOutlineGithub size={32} color="#8a0000"/>
      </a>
      <a
        href="mailto:bbui57@gmail.com"
        aria-label="Email"
      >
        <AiOutlineMail size={32} color="#8a0000"/>
      </a>
      <a
        href="https://www.linkedin.com/in/brian-q-bui/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <AiOutlineLinkedin size={32} color="#8a0000"/>
      </a>
    </>
  );
}

function ProjectGrid() {
  const projects = [
    {
      title: "Tetris Simulation",
      img: tetrisdemo,
      link: "",
      desc: "Created in Python using Pygame library."
    },
    {
      title: "Motion Tracking",
      img: motiondemo,
      link: "https://github.com/bbui57/Camera-Tracking",
      desc: "Done in Python using OpenCV. Intending to utilize Keras for future work."
    },
    {
      title: "Model and Animation",
      img: modeldemo,
      link: "",
      desc: "Created using OpenGL and FLTK."
    },
    {
      title: "This Portfolio!",
      img: portfolioimg,
      link: "https://bbui57.github.io",
      desc: "Created using React and CSS."
    },
    {
      title: "Heroes of Odyria",
      img: gamedemo,
      link: "https://github.com/bbui57/OC-RPG-Game",
      desc: "Created with the Godot game engine and custom artwork."
    },
  ];

  return (
    <div className="project-grid">
      <a className="project-thumb">
        <img src={projects[0].img} />
        <div className="project-title">{projects[0].title}</div>
        <div className="project-desc">{projects[0].desc}</div>
      </a>
      <a className="project-thumb">
        <img src={projects[1].img} />
        <div className="project-title">{projects[1].title}</div>
        <div className="project-desc">{projects[1].desc}</div>
      </a>
      <a className="project-thumb">
        <img src={projects[2].img} />
        <div className="project-title">{projects[2].title}</div>
        <div className="project-desc">{projects[2].desc}</div>
      </a>
      <a className="project-thumb" href={projects[3].link} target="_blank" rel="noopener noreferrer">
        <img src={projects[3].img} />
        <div className="project-title">{projects[3].title}</div>
        <div className="project-desc">{projects[3].desc}</div>
      </a>
      <a className="project-thumb" href={projects[4].link} target="_blank" rel="noopener noreferrer">
        <img src={projects[4].img} />
        <div className="project-title">{projects[4].title}</div>
        <div className="project-desc">{projects[4].desc}</div>
      </a>
    </div>
  );
}

export default App;
