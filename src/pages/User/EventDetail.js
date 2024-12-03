import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams(); // Get the UUID from the URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        console.log("Fetching event detail for ID:", id);
        const response = await axios.get(
          `https://kovebox-server-90387d3b18a6.herokuapp.com/api/events/${id}`
        );
        console.log("Fetched Event Detail:", response.data);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event detail:", err.message);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetail();
    } else {
      setError("Event ID is missing!");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>No event found.</p>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="event-detail-image "
        />
      )}
      <p>{event.snippet}</p>
      <p>
        <strong>Event Page:</strong>{" "}
        <a href={event.contextLink} target="_blank" rel="noopener noreferrer">
          {event.contextLink}
        </a>
      </p>
    </div>
  );
};

export default EventDetail;
