import { ArrowLeft, MapPin, Calendar, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { destinations } from "../data/destinations";
import FamousPlaces from "../components/FamousPlaces";
import WeatherCard from "../components/WeatherCard";
import DestinationAssistant from "../components/DestinationAssistant";
import ItineraryPlanner from "../components/ItineraryPlanner";

const DestinationDetails = () => {
  const { id } = useParams();

  const destination = destinations.find(
    (item) => item.id === id
  );

  if (!destination) {
    return (
      <div className="not-found-page">
        <h1>Destination not found.</h1>

        <Link to="/">
          Back to explore
        </Link>
      </div>
    );
  }

  return (
    <main className="destination-details">

      {/* HERO */}
      <section
        className="details-hero"
        style={{
          backgroundImage: `url(${destination.image})`,
        }}
      >
        <div className="details-overlay"></div>

        <Link to="/" className="back-button">
          <ArrowLeft size={20} />
          Back to explore
        </Link>

        <div className="details-hero-content">
          <p>{destination.country}</p>

          <h1>{destination.name}</h1>

          <span>{destination.tagline}</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="details-intro">
        <div className="details-intro-label">
          <MapPin size={18} />
          <span>
            {destination.region}, {destination.country}
          </span>
        </div>

        <h2>
          A journey made of
          <br />
          <span>moments.</span>
        </h2>

        <p>{destination.description}</p>
      </section>

      {/* QUICK FACTS */}
      <section className="quick-facts">
        <div className="fact">
          <Calendar size={20} />
          <div>
            <span className="fact-label">BEST TIME TO VISIT</span>
            <p>{destination.bestTime}</p>
          </div>
        </div>

        <div className="fact">
          <Sparkles size={20} />
          <div>
            <span className="fact-label">IDEAL FOR</span>
            <p>{destination.idealFor}</p>
          </div>
        </div>
      </section>

      <WeatherCard coordinates={destination.coordinates} />

      {/* HIGHLIGHTS */}
      <FamousPlaces destination={destination} />

      <DestinationAssistant destination={destination} />

      <ItineraryPlanner destination={destination} />

    </main>
  );
};

export default DestinationDetails;