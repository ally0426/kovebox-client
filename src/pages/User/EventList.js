import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [offset, setOffset] = useState(0);
  const limit = 10; // Number of events per request

  // Detect user location
  useEffect(() => {
    const detectLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
            setLocation({ latitude: 34.0522, longitude: -118.2437 }); // Default to Los Angeles, CA
          }
        );
      } else {
        console.warn("Geolocation not supported by this browser.");
        setLocation({ latitude: 34.0522, longitude: -118.2437 });
      }
    };

    detectLocation();
  }, []);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Requesting events with:", {
          offset,
          limit,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        const response = await axios.get(
          `https://kovebox-server-90387d3b18a6.herokuapp.com/api/events`,
          {
            params: {
              offset,
              limit,
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }
        );

        console.log("Fetched events:", JSON.stringify(response.data, null, 2));
        if (response.data.error) {
          console.error("Error from server: ", response.data.error);
        } else {
          setEvents((prevEvents) => [...prevEvents, ...response.data]);
        }
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setError("Failed to fetch events.");
      }
    };

    if (location.latitude && location.longitude) {
      fetchEvents();
    }
  }, [location, offset]);

  // Infinite scroll handler
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

  return (
    <div>
      {error && <p>{error}</p>}
      {events.length === 0 && !error && <p>No events found.</p>}
      <div className="event-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            {event.image ? (
              <img src={event.image} alt={event.title} />
            ) : (
              <p>No image available</p>
            )}
            <h3>{event.title}</h3>
            <p>{event.snippet}</p>
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
