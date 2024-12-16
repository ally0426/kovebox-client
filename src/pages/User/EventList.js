import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = ({ location, searchQuery }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = {
          offset,
          limit,
        };

        if (location?.latitude && location?.longitude) {
          params.latitude = location.latitude;
          params.longitude = location.longitude;
        } else if (searchQuery) {
          params.searchQuery = searchQuery;
        }

        const response = await axios.get(
          `https://kovebox-server-90387d3b18a6.herokuapp.com/api/events`,
          { params }
        );

        setEvents((prevEvents) => [...prevEvents, ...response.data]);
      } catch (err) {
        setError("Failed to fetch events.");
      }
    };

    fetchEvents();
  }, [location, searchQuery, offset]);

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
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <a href={event.contextLink} target="_blank" rel="noopener noreferrer">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
