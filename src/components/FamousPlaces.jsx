import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const FamousPlaces = ({ destination }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const placeData = destination.highlights.map((place, index) => ({
      id: `${destination.id}-${index}`,
      name: place.name,
      description: place.description,
      image: place.image,
    }));

    setPlaces(placeData);
    setLoading(false);
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

      {!loading && (
        <div className="places-grid">
          {places.map((place, index) => (
            <article className="place-card" key={place.id}>
              <div className="place-image-wrapper">
                <img
                  src={place.image}
                  alt={place.name}
                  className="place-image"
                  loading="lazy"
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