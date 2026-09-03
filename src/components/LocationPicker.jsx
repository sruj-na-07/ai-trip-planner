import { useState } from "react";
import {
  MapPin,
  Search,
  Navigation,
  AlertCircle,
} from "lucide-react";

const LocationPicker = () => {
  const getSavedLocation = () => {
  const savedLocation = localStorage.getItem("userLocation");

  if (!savedLocation) return "";

  try {
    return JSON.parse(savedLocation).name;
  } catch {
    return savedLocation;
  }
};

const [location, setLocation] = useState(getSavedLocation);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const saveLocation = (locationData) => {
    setLocation(locationData.name);

    localStorage.setItem(
      "userLocation",
      JSON.stringify(locationData)
    );
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessage(
        "Your browser doesn't support location services. Search for your city instead."
      );
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("Requesting access to your location...");
    setMessageType("info");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Store coordinates directly
          const locationData = {
            name: "Your current location",
            latitude,
            longitude,
          };

          saveLocation(locationData);

          setMessage("Location found successfully!");
          setMessageType("success");
        } catch (error) {
          console.error(error);

          setMessage(
            "We found your location, but couldn't identify the city. Your coordinates were saved."
          );
          setMessageType("info");
        } finally {
          setLoading(false);
        }
      },

      (error) => {
        setLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setMessage(
            "Location access was denied. No problem — you can still search and choose your city below."
          );
          setMessageType("error");
        } else {
          setMessage(
            "We couldn't determine your location. Please search for a city instead."
          );
          setMessageType("error");
        }
      }
    );
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    try {
      setLoading(true);
      setMessage("Searching for locations...");
      setMessageType("info");
      setResults([]);

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          search
        )}&count=5&language=en&format=json`
      );

      if (!response.ok) {
        throw new Error("Location search failed");
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setMessage(
          "We couldn't find that location. Try another city or region."
        );
        setMessageType("error");
        return;
      }

      setResults(data.results);
      setMessage("");
      setMessageType("");
    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong while searching. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (result) => {
    const locationName = `${result.name}${
      result.admin1 ? `, ${result.admin1}` : ""
    }${result.country ? `, ${result.country}` : ""}`;

    saveLocation({
      name: locationName,
      latitude: result.latitude,
      longitude: result.longitude,
    });

    setResults([]);
    setSearch("");

    setMessage("Location selected successfully!");
    setMessageType("success");
  };

  return (
    <section className="location-section" id="journey">
      <div className="location-content">
        <p className="section-eyebrow">
          PERSONALISE YOUR JOURNEY
        </p>

        <h2>
          Where are you
          <span> dreaming from?</span>
        </h2>

        <p className="location-description">
          Share your location or search for a city to personalise your
          travel experience.
        </p>

        {location && (
          <div className="selected-location">
            <MapPin size={18} />
            <span>{location}</span>
          </div>
        )}

        <button
          className="current-location-button"
          onClick={handleCurrentLocation}
          disabled={loading}
        >
          <Navigation size={18} />

          {loading
            ? "Finding your location..."
            : "Use my current location"}
        </button>

        <div className="location-divider">
          <span>OR</span>
        </div>

        <form
          className="location-search-form"
          onSubmit={handleSearch}
        >
          <Search size={18} />

          <input
            type="text"
            placeholder="Search for a city or region"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search for your location"
          />

          <button type="submit" disabled={loading}>
            Search
          </button>
        </form>

        {message && (
          <div
            className={`location-message ${messageType}`}
            role="alert"
          >
            {messageType === "error" && (
              <AlertCircle size={18} />
            )}

            <span>{message}</span>
          </div>
        )}

        {results.length > 0 && (
          <div className="location-results">
            {results.map((result) => {
              const resultName = `${result.name}${
                result.admin1 ? `, ${result.admin1}` : ""
              }${result.country
                ? `, ${result.country}`
                : ""
              }`;

              return (
                <button
                  type="button"
                  className="location-result"
                  key={`${result.id || result.name}-${result.latitude}`}
                  onClick={() =>
                    handleSelectLocation(result)
                  }
                >
                  <MapPin size={17} />

                  <span>{resultName}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationPicker;