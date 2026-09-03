import { useState } from "react";
import {
  CalendarDays,
  Sparkles,
  LoaderCircle,
  Sunrise,
  Sun,
  Moon,
} from "lucide-react";

const travelStyles = [
  "Relaxed",
  "Cultural",
  "Adventurous",
  "Food & Local Life",
];

const ItineraryPlanner = ({ destination }) => {
  const [days, setDays] = useState(3);
  const [travelStyle, setTravelStyle] = useState("Cultural");
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateItinerary = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "itinerary",
          destination,
          days,
          travelStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to generate your itinerary."
        );
      }

      if (!data.itinerary || !Array.isArray(data.itinerary)) {
        throw new Error("Invalid itinerary received.");
      }

      setItinerary(data.itinerary);
    } catch (error) {
      console.error("Itinerary error:", error);

      setError(
        "We couldn't create your itinerary right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="itinerary-section">
      <div className="itinerary-container">

        {/* Header */}

        <div className="itinerary-header">
          <div>
            <p className="section-eyebrow">
              AI JOURNEY PLANNER
            </p>

            <h2>
              Your days in <span>{destination.name}</span>
            </h2>
          </div>

          <CalendarDays size={30} />
        </div>

        <p className="itinerary-intro">
          Choose how you want to travel and let your journey take shape,
          one thoughtful day at a time.
        </p>

        {/* Controls */}

        <div className="itinerary-controls">

          <div className="planner-control">
            <label htmlFor="days">
              How many days?
            </label>

            <select
              id="days"
              value={days}
              onChange={(event) =>
                setDays(Number(event.target.value))
              }
              disabled={loading}
            >
              {[2, 3, 4, 5, 7].map((day) => (
                <option key={day} value={day}>
                  {day} days
                </option>
              ))}
            </select>
          </div>

          <div className="planner-control">
            <span className="planner-label">
              Travel style
            </span>

            <div className="travel-style-options">
              {travelStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  className={
                    travelStyle === style
                      ? "active"
                      : ""
                  }
                  onClick={() => setTravelStyle(style)}
                  disabled={loading}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Generate Button */}

        <button
          className="generate-itinerary-button"
          onClick={generateItinerary}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle
                size={18}
                className="itinerary-loader"
              />
              Creating your journey...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate my itinerary
            </>
          )}
        </button>

        {/* Error */}

        {error && (
          <div
            className="itinerary-error"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Empty State */}

        {!loading && itinerary.length === 0 && !error && (
          <div className="itinerary-empty">
            <CalendarDays size={28} />
            <p>
              Your personalised day-by-day journey will appear here.
            </p>
          </div>
        )}

        {/* Itinerary Results */}

        {itinerary.length > 0 && (
          <div className="itinerary-results">

            {itinerary.map((dayPlan) => (
              <article
                className="itinerary-day"
                key={dayPlan.day}
              >
                <div className="day-number">
                  DAY {String(dayPlan.day).padStart(2, "0")}
                </div>

                <div className="day-content">

                  <h3>{dayPlan.title}</h3>

                  <div className="day-activities">

                    <div className="day-activity">
                      <Sunrise size={19} />

                      <div>
                        <span>Morning</span>
                        <p>{dayPlan.morning}</p>
                      </div>
                    </div>

                    <div className="day-activity">
                      <Sun size={19} />

                      <div>
                        <span>Afternoon</span>
                        <p>{dayPlan.afternoon}</p>
                      </div>
                    </div>

                    <div className="day-activity">
                      <Moon size={19} />

                      <div>
                        <span>Evening</span>
                        <p>{dayPlan.evening}</p>
                      </div>
                    </div>

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default ItineraryPlanner;