import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import heroVideo from "../assets/hero-video.mp4";

const Hero = () => {
  return (
    <section className="hero">
            {/* Video */}
        <video
  className="hero-video"
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
>
  <source src={heroVideo} type="video/mp4" />
</video>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          YOUR NEXT STORY STARTS HERE
        </motion.p>

        <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  Don't just visit
  <br />
  a place.
  <br />
  <span>Feel it.</span>
</motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Discover places that move you, experiences that stay with you,
          and journeys made entirely your own.
        </motion.p>

        <motion.a
          href="#moods"
          className="hero-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Begin exploring
        </motion.a>
      </div>

      <a href="#moods" className="scroll-indicator" aria-label="Scroll down">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={18} />
      </a>
    </section>
  );
};

export default Hero;