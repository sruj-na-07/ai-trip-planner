import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MoodSelector from "./components/MoodSelector";
import Explore from "./components/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import NotFound from "./pages/NotFound";
import LocationPicker from "./components/LocationPicker";

function Home() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <MoodSelector
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
        />

        <Explore
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
        />
         <LocationPicker />

         <section className="about-section" id="about">
  <div className="about-content">
    <p className="section-eyebrow">ABOUT NOMAD</p>

    <h2>
      Travel with
      <span> intention.</span>
    </h2>

    <p>
      NOMAD is an AI-powered trip planning experience designed to help
      you discover meaningful destinations, understand the places worth
      visiting, check real-time weather, and build a personalised
      itinerary in one place.
    </p>
  </div>
</section>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/destination/:id"
          element={<DestinationDetails />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;