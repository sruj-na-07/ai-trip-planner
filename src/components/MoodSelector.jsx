import { motion } from "framer-motion";
import { Compass, Mountain, Heart, Sparkles } from "lucide-react";

const moods = [
  {
    id: "escape",
    number: "01",
    title: "Escape",
    description: "Slow down. Breathe deeper. Leave the ordinary behind.",
    icon: Heart,
  },
  {
    id: "discover",
    number: "02",
    title: "Discover",
    description: "Stories, cultures, and streets waiting to be explored.",
    icon: Compass,
  },
  {
    id: "wander",
    number: "03",
    title: "Wander",
    description: "Follow curiosity and find beauty in the unexpected.",
    icon: Mountain,
  },
  {
    id: "recharge",
    number: "04",
    title: "Recharge",
    description: "Pause, reconnect, and find your way back to yourself.",
    icon: Sparkles,
  },
];

// const MoodSelector = () => {
  const MoodSelector = ({ selectedMood, setSelectedMood }) => {
  return (
    <section className="mood-section" id="moods">
      <div className="mood-heading">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-eyebrow"
        >
          FIND YOUR NEXT ESCAPE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What are you
          <br />
          <span>seeking?</span>
        </motion.h2>

        <p className="mood-intro">
          Every journey begins with a feeling. Tell us what you are looking
          for, and let the world lead you there.
        </p>
      </div>

      <div className="mood-grid">
        {moods.map((mood, index) => {
          const Icon = mood.icon;

          return (
            <motion.button
              className="mood-card"
              key={mood.id}
              onClick={() => {
  setSelectedMood(mood.id);

  document
    .getElementById("explore")
    ?.scrollIntoView({ behavior: "smooth" });
}}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="mood-top">
                <span className="mood-number">{mood.number}</span>
                <Icon size={24} strokeWidth={1.5} />
              </div>

              <div className="mood-content">
                <h3>{mood.title}</h3>
                <p>{mood.description}</p>
              </div>

              <span className="mood-arrow">↗</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default MoodSelector;