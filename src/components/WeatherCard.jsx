import { useEffect, useState } from "react";
import {
  CloudSun,
  CloudRain,
  Sun,
  Cloud,
  Snowflake,
  Wind,
} from "lucide-react";

const getWeatherInfo = (code) => {
  if ([0, 1].includes(code)) {
    return {
      label: "Clear skies",
      Icon: Sun,
    };
  }

  if ([2, 3].includes(code)) {
    return {
      label: "Partly cloudy",
      Icon: CloudSun,
    };
  }

  if ([45, 48].includes(code)) {
    return {
      label: "Foggy",
      Icon: Cloud,
    };
  }

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return {
      label: "Rainy",
      Icon: CloudRain,
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: "Snowy",
      Icon: Snowflake,
    };
  }

  return {
    label: "Windy",
    Icon: Wind,
  };
};

const WeatherCard = ({ coordinates, destinationName }) => {
  if (!coordinates?.lat || !coordinates?.lon) {
    return (
      <section className="weather-card">
        <p>Weather information is unavailable right now.</p>
      </section>
    );
  }

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`
        );

        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data = await response.json();

        setWeather(data.current);
      } catch (error) {
        console.error("Unable to fetch weather:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coordinates.lat, coordinates.lon]);

  if (loading) {
    return (
      <div className="weather-card">
        <p>Checking the skies...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-card">
        <p>Weather information is unavailable right now.</p>
      </div>
    );
  }

  const { label, Icon } = getWeatherInfo(weather.weather_code);

  return (
    <section className="weather-card">
      <div className="weather-header">
        <div>
          <p className="section-eyebrow">CURRENT CONDITIONS</p>
<h3>{label}</h3>
<p className="weather-location">{destinationName}</p>
        </div>

        <Icon size={42} strokeWidth={1.4} />
      </div>

      <div className="weather-data">
        <div>
          <span>Temperature</span>
          <strong>{Math.round(weather.temperature_2m)}°C</strong>
        </div>

        <div>
          <span>Wind speed</span>
          <strong>{Math.round(weather.wind_speed_10m)} km/h</strong>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;