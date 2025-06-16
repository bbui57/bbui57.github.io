import  React from 'react';
import { motion } from 'framer-motion';
import pic1 from "./assets/CasualMe.JPG";
import pic2 from "./assets/GradCape.JPG";
import pic3 from "./assets/GradShoot.JPG";
import './App.css';

function App() {
  const images = [
    pic1,
    pic2,
    pic3
  ];
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }
  , []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-circle">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt="It's me!"
            className="fade-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{duration: 3}}
          />
          </div>

          <div className="tabs-container">
            <Tab label="About Me" description="Hello! My name is Brian Bui."/>
            <Tab label="Projects" />
            <Tab label="Contact" description="Reach me through:"/>
          </div>
      </header>
    </div>
  );
}

function Tab({ label, description }) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div
      className="tab"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {label}
      {isActive && (
        <motion.div
          className="blurb"
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {description}
        </motion.div>
      )}
    </div>
  );
}

export default App;
