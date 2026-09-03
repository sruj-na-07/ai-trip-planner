import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { searchImages } from "../services/unsplash";

const FamousPlaces = ({ destination }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(false);

        const results = await searchImages(
          `famous places ${destination.name} ${destination.country}`,
          3
        );

        const placeData = destination.highlights.map(
          (place, index) => {
            // Supports both object and string highlight formats
            const placeName =
              typeof place === "string" ? place : place.name;

            const placeDescription =
              typeof place === "string"
                ? `Discover one of the memorable experiences in ${destination.name}.`
                : place.description;

            return {
              id: `${destination.id}-${index}`,
              name: placeName,
              description: placeDescription,
              image: results[index]?.urls?.regular || destination.image,
            };
          }
        );

        setPlaces(placeData);
      } catch (error) {
        console.error("Unable to fetch place images:", error);

        setError(true);

        const fallbackPlaces = destination.highlights.map(
          (place, index) => {
            const placeName =
              typeof place === "string" ? place : place.name;

            const placeDescription =
              typeof place === "string"
                ? `Discover one of the memorable experiences in ${destination.name}.`
                : place.description;

            return {
              id: `${destination.id}-${index}`,
              name: placeName,
              description: placeDescription,
              image: destination.image,
            };
          }
        );

        setPlaces(fallbackPlaces);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [destination]);

  return (
    <section className="famous-places-section">
      <div className="famous-places-heading">
        <div>
          <p className="section-eyebrow">
            PLACES THAT DEFINE THE JOURNEY
          </p>

          <h2>
            Worth stepping
            <span> out for.</span>
          </h2>
        </div>

        <p className="famous-places-intro">
          A few places that capture the character and spirit of{" "}
          {destination.name}.
        </p>
      </div>

      {loading && (
        <div className="places-loading">
          <span>Discovering remarkable places...</span>
        </div>
      )}

      {error && !loading && (
        <p className="places-error">
          Images are unavailable right now, but these places are still
          worth exploring.
        </p>
      )}

      {!loading && (
        <div className="places-grid">
          {places.map((place, index) => (
            
            <article
              className="place-card"
              key={place.id}
            >
              <div className="place-image-wrapper">
                <img
                  src={place.image}
                  alt={place.name}
                  className="place-image"
                />

                <span className="place-number">
  {String(index + 1).padStart(2, "0")}
</span>
              </div>

              <div className="place-content">
                <div className="place-title">
                  <MapPin size={17} />
                  <h3>{place.name}</h3>
                </div>

                <p>{place.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FamousPlaces;