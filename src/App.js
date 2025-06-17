import  React from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import pic1 from "./assets/Me1.JPG";
import pic2 from "./assets/Me2.JPG";
import pic3 from "./assets/Me3.JPG";
import {AiOutlineGithub, AiOutlineLinkedin} from "react-icons/ai";
import './App.css';

function App() {
  const images = [pic1, pic2, pic3];
  const [currentImage, setCurrentImage] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(null);
  const [blurb, setBlurb] = React.useState(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  });

  return (
    <div className="App">
    <motion.header
      className="App-header"
      animate={{ x: activeTab === "About Me" ? "30vw" : activeTab ? "-30vw" : "0vw", width: activeTab ? "10vw" : "40vw"}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >

      <motion.div 
        className="title-container"
        animate={{translateY: activeTab ? "30vh" : "2vh", scale: activeTab ? 0.8 : 1}}
        transition={{duration: 0.5, ease: "easeInOut"}}
      >
        <h1 className="title">Brian D. Bui</h1>
        <h4 className="subtitle">Student at George Mason University <br></br>Candidate for M.S. Computer Science</h4>
      </motion.div>
      
      <motion.div
        className="main-circle"
        animate={{translateY: activeTab ? "-30vh" : "-10vh", translateX: "0vw", scale: activeTab ? 0.8 : 1}}
        transition={{duration: 0.5, ease: "easeInOut"}}
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

      <motion.div
        animate={{translateY: activeTab ? "0vh" : "9vh", translateX: activeTab ? "-3vw" : "-4vw", scale: activeTab ? 0.8 : 1}}
        transition={{duration: 0.5, ease: "easeInOut"}}
      >
        <Resume />
      </motion.div>

      <motion.div
        animate={{translateY: activeTab ? "-48vh" : "9vh", translateX: activeTab === "About Me" ? "-14vw" : "8vw", opacity: activeTab ? 1 : 0, scale: 0.8}}
        transition={{duration: 0.5, ease: "easeInOut"}}
      >
        <BackButton />
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
              <Tab label="Projects" route="./projects"setActiveTab={setActiveTab} setBlurb={setBlurb}/>
            </motion.div>
            <SkillCarousel />
          </>
        )}
      </AnimatePresence>
    </motion.header>

    <motion.p
        className = "blurb"
        animate = {{opacity: activeTab ? 1 : 0, x: activeTab === "About Me" ? "-11vw" : activeTab ? "11vw" : "0vw" }}
        transition = {{duration: 1}}
      >
        {blurb}
      </motion.p>

    </div>
  );
}

function Tab({ label, setActiveTab, setBlurb }) {
  const handleClick = () => {
    setActiveTab(label);
  
    if (label === "About Me") {
      setBlurb("I am a student at George Mason University, pursuing a Master's degree in Computer Science. I have a passion for software development and enjoy working on projects that challenge my skills.");
    } else if (label === "Projects") {
      setBlurb("Here are some of my projects that showcase my skills in software development, including web applications, data analysis, and more.");
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
    <a href="./assets/Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">
      <button>Resume</button>
    </a>
  );
}

function BackButton() {
  return (
    <a href="./" className="back-button">
      <button>Back</button>
    </a>
  )
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

export default App;
