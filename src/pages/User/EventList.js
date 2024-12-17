import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]); // State to store fetched events
  const [error, setError] = useState(""); // State for error messages
  const [offset, setOffset] = useState(0); // Pagination offset
  const limit = 10; // Number of events per request
  const [manualSearch, setManualSearch] = useState(""); // Manual search input
  const [location, setLocation] = useState("United States"); // Default location
  const [coords, setCoords] = useState(null); // User coordinates

  useEffect(() => {
    fetchEvents(location, coords); // Fetch events on initial load
  }, []);

  // Function to fetch events
  const fetchEvents = async (searchLocation = "United States", userCoords = null) => {
    try {
      setError(""); // Reset error message
      const params = {
        offset,
        limit,
        searchQuery: searchLocation,
      };

      if (userCoords?.latitude && userCoords?.longitude) {
        params.latitude = userCoords.latitude;
        params.longitude = userCoords.longitude;
      }

      console.log("Fetching events with params:", params);

      const response = await axios.get(
        `https://kovebox-server-90387d3b18a6.herokuapp.com/api/events`,
        { params }
      );

      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err.message);
      setError("Failed to load events. Showing default events for the USA.");
      setEvents([]); // Default to no events
      setLocation("United States");
      fetchEvents("United States"); // Reload USA events as fallback
    }
  };

  // Function to handle "USE MY AREA"
  const handleUseMyArea = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setCoords({ latitude, longitude });
          setLocation(`Lat: ${latitude}, Lng: ${longitude}`);
          fetchEvents("Your Area", { latitude, longitude }); // Fetch events with coordinates
        },
        (err) => {
          console.error("Error detecting location:", err.message);
          alert("Unable to detect location. Defaulting to USA.");
          fetchEvents("United States");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      fetchEvents("United States");
    }
  };

  // Function to handle SEARCH
  const handleManualSearch = () => {
    if (!manualSearch.trim()) {
      alert("Please enter a valid location.");
      return;
    }

    fetchEvents(manualSearch); // Fetch events for entered location
  };

  return (
    <div>
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

      {/* Display Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Event List */}
      <div className="event-grid">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={
                  event.image || "https://via.placeholder.com/300x200?text=No+Image+Available"
                }
                alt={event.title}
              />
              <h3>{event.title}</h3>
              <p>{event.snippet}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Time:</strong> {event.time}
              </p>
              <a
                href={event.contextLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
