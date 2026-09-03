import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      className="destination-card"
      onClick={() => navigate(`/destination/${destination.id}`)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="destination-image-wrapper">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          className="destination-image"
        />

        <div className="destination-image-overlay"></div>

        <div className="destination-region">
          {destination.region}
        </div>
      </div>

      <div className="destination-info">
        <div>
          <p className="destination-country">
            {destination.country}
          </p>

          <h3>{destination.name}</h3>

          <p className="destination-tagline">
            {destination.tagline}
          </p>
        </div>

        <div className="destination-arrow">
          <ArrowUpRight size={22} strokeWidth={1.5} />
        </div>
      </div>
    </motion.article>
  );
};

export default DestinationCard;