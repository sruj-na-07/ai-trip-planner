import { useState } from "react";
import { Search, X } from "lucide-react";
import { destinations } from "../data/destinations";
import DestinationCard from "./DestinationCard";

const Explore = ({ selectedMood, setSelectedMood }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const regions = ["All", "Asia", "Europe"];

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      destination.country
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === "All" ||
      destination.region === selectedRegion;

    const matchesMood =
      !selectedMood ||
      destination.mood.includes(selectedMood);

    return matchesSearch && matchesRegion && matchesMood;
  });

  const clearMood = () => {
    setSelectedMood(null);
  };

  return (
    <section className="explore-section" id="explore">
      <div className="explore-header">
        <div>
          <p className="section-eyebrow">CURATED FOR YOU</p>

          <h2>
            Places worth
            <br />
            <span>getting lost in.</span>
          </h2>
        </div>

        <p className="explore-intro">
          Search for a destination, explore by region, or follow a feeling
          and discover where it takes you.
        </p>
      </div>

      <div className="explore-controls">
        <div className="search-box">
          <Search size={19} strokeWidth={1.8} />

          <input
            type="text"
            placeholder="Search a destination or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search destinations"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="filter-container">
          {regions.map((region) => (
            <button
              key={region}
              className={
                selectedRegion === region
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setSelectedRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {selectedMood && (
        <div className="active-mood">
          <span>
            Showing destinations for your chosen feeling
          </span>

          <button onClick={clearMood}>
            Show all ×
          </button>
        </div>
      )}

      {filteredDestinations.length > 0 ? (
        <div className="destination-grid">
          {filteredDestinations.map((destination) => (
            <DestinationCard
  key={destination.id}
  destination={destination}
/>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No journeys found.</h3>

          <p>
            Try changing your search or exploring a different feeling.
          </p>

          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedRegion("All");
              setSelectedMood(null);
            }}
          >
            Reset exploration
          </button>
        </div>
      )}
    </section>
  );
};

export default Explore;