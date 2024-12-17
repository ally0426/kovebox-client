import React, { useState, useEffect } from "react";
import EventList from "../User/EventList";
import axios from "axios";

const HomePage = () => {
  const [events, setEvents] = useState([]); // State for events
  const [error, setError] = useState(""); // State for error messages
  const [location, setLocation] = useState("United States"); // Default to USA
  const [coords, setCoords] = useState(null); // User coordinates
  const [manualSearch, setManualSearch] = useState(""); // Manual search input
  const [offset, setOffset] = useState(0); // Pagination offset
  const limit = 10; // Limit for events per fetch

  // Fetch Events Function
  const fetchEvents = async (searchLocation = "United States", userCoords = null) => {
    try {
      setError("");
      const params = {
        offset,
        limit,
        searchQuery: searchLocation,
      };

      if (userCoords?.latitude && userCoords?.longitude) {
        params.latitude = userCoords.latitude;
        params.longitude = userCoords.longitude;
      }

      const response = await axios.get(
        `https://kovebox-server-90387d3b18a6.herokuapp.com/api/events`,
        { params }
      );

      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err.message);
      setError("Failed to load events. Showing default events for the USA.");
      fetchEvents("United States");
    }
  };

  // On initial page load, fetch default USA events
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle "USE MY AREA"
  const handleUseMyArea = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setCoords({ latitude, longitude });
          setLocation(`Lat: ${latitude}, Lng: ${longitude}`);
          fetchEvents("Your Area", { latitude, longitude });
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          alert("Unable to detect location. Defaulting to USA.");
          fetchEvents("United States");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      fetchEvents("United States");
    }
  };

  // Handle Manual Search
  const handleManualSearch = () => {
    if (!manualSearch.trim()) {
      alert("Please enter a valid location.");
      return;
    }
    setCoords(null); // Reset user coordinates
    fetchEvents(manualSearch);
  };

  return (
    <div>
      <h1>Find Korean Events Near You</h1>

      {/* Controls */}
      <div className="controls">
        <button onClick={handleUseMyArea}>USE MY AREA</button>
        <input
          type="text"
          placeholder="Search for a location"
          value={manualSearch}
          onChange={(e) => setManualSearch(e.target.value)}
        />
        <button onClick={handleManualSearch}>SEARCH</button>
      </div>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Event List */}
      <EventList events={events} />
    </div>
  );
};

export default HomePage;
