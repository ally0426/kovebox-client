import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = ({ location, searchQuery }) => {
  const [events, setEvents] = useState([]); // State to store fetched events
  const [error, setError] = useState(""); // State for error handling
  const [offset, setOffset] = useState(0); // Pagination offset
  const limit = 10; // Number of events to load per request
  const [manualSearch, setManualSearch] = useState(searchQuery || ""); // State for manual search input
  const [userLocation, setUserLocation] = useState(location); // Store user location

  useEffect(() => {
    // Fetch Events Function
    const fetchEvents = async () => {
      try {
        const params = {
          offset,
          limit,
        };

        if (userLocation?.latitude && userLocation?.longitude) {
          // Fetch based on user location
          params.latitude = userLocation.latitude;
          params.longitude = userLocation.longitude;
        } else if (manualSearch) {
          // Fetch based on manual search input
          params.searchQuery = manualSearch;
        } else {
          // Default behavior - Fetch events in the USA
          params.searchQuery = "United States";
        }

        console.log("Fetching events with params:", params);

        const response = await axios.get(
          `https://kovebox-server-90387d3b18a6.herokuapp.com/api/events`,
          { params }
        );

        console.log("Fetched events:", response.data);
        setEvents((prevEvents) =>
          offset === 0 ? response.data : [...prevEvents, ...response.data]
        );
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setError("Failed to fetch events.");
      }
    };

    fetchEvents();
  }, [userLocation, manualSearch, offset]);

  // Infinite Scroll Functionality
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 500
    ) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect User Location
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setOffset(0); // Reset pagination
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          alert("Unable to detect location. Please enter a location manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle Manual Search
  const handleManualSearch = () => {
    if (!manualSearch.trim()) {
      alert("Please enter a valid location.");
      return;
    }
    setUserLocation(null); // Clear user location
    setOffset(0); // Reset pagination
    setEvents([]); // Clear events
  };

  return (
    <div>
      <div className="controls">
        {/* Show My Area Button */}
        <button onClick={fetchUserLocation}>SHOW MY AREA</button>

        {/* Manual Search Box */}
        <input
          type="text"
          placeholder="Search for a location"
          value={manualSearch}
          onChange={(e) => setManualSearch(e.target.value)}
        />
        <button onClick={handleManualSearch}>SEARCH</button>
      </div>

      {/* Event List */}
      {error && <p>{error}</p>}
      {events.length === 0 && !error && <p>No events found.</p>}

      <div className="event-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            {/* Image */}
            <img
              src={
                event.image || "https://via.placeholder.com/300x200?text=No+Image+Available"
              }
              alt={event.title}
            />
            {/* Event Title */}
            <h3>{event.title}</h3>

            {/* Event Description */}
            <p>{event.snippet}</p>

            {/* Location */}
            <p>
              <strong>Location:</strong> {event.location || "Unknown location"}
            </p>

            {/* Time */}
            <p>
              <strong>Time:</strong> {event.time || "Time not available"}
            </p>

            {/* View Details */}
            <a
              href={event.contextLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
