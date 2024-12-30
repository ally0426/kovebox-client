import React, { useState, useEffect } from "react";
import EventList from "./User/EventList";
import axios from "axios";

const HomePage = () => {
  const [events, setEvents] = useState([]); // State for events
  const [error, setError] = useState(""); // Error state
  const [manualSearch, setManualSearch] = useState(""); // Manual search input
  const [state, setState] = useState("United States"); // Default location
  const [offset, setOffset] = useState(0); // Pagination offset
  const limit = 10; // Number of results per request

  // Fetch Events
  const fetchEvents = async (locationQuery = "United States") => {
    try {
      setError(""); // Reset errors
      const params = {
        offset,
        limit,
        searchQuery: locationQuery,
      };

      const response = await axios.get(
        `https://kovebox-server-90387d3b18a6.herokuapp.com/api/events`,
        { params }
      );

      setEvents(response.data);
      console.log("Loaded events for:", locationQuery);
    } catch (err) {
      console.error("Error fetching events:", err.message);
      setError("Failed to load events. Showing default USA events.");
      fetchEvents("United States");
    }
  };

  // Reverse-Geocode User Coordinates
  const fetchStateFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${latitude},${longitude}`,
            key: process.env.REACT_APP_GOOGLE_GEOCODING_KEY, // Replace with your API key
          },
        }
      );

      // Extract state name from geocoding response
      const results = response.data.results;
      const stateResult = results.find((result) =>
        result.types.includes("administrative_area_level_1")
      );

      if (stateResult) {
        const stateName = stateResult.address_components[0].long_name;
        console.log("Detected State:", stateName);
        alert(`Detected State: ${stateName}`);
        setState(stateName);
        fetchEvents(stateName); // Load events based on state name
      } else {
        alert("Unable to detect state. Loading default USA events.");
        fetchEvents("United States");
      }
    } catch (err) {
      console.error("Error fetching state name:", err.message);
      alert("Failed to detect location. Loading default USA events.");
      fetchEvents("United States");
    }
  };

  // Handle "Show My Area"
  const handleUseMyArea = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchStateFromCoordinates(latitude, longitude); // Reverse-geocode to get state
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          alert("Unable to detect location. Loading default USA events.");
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
    fetchEvents(manualSearch);
  };

  // Fetch Default Events on Initial Page Load
  useEffect(() => {
    fetchEvents();
  }, []);

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

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Event List */}
      <EventList events={events} />
    </div>
  );
};

export default HomePage;
