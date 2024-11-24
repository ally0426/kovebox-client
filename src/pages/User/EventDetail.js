import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await axios.get(
          `https://kovebox-server-90387d3b18a6.herokuapp.com/api/event/${id}`
        );
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event detail:", err.message);
        setError("Failed to load event details.");
      }
    };

    fetchEventDetail();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Loading event details...</p>;
  }

  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`event: ${event}`);

  return (
    <div>
      <h1>{event.title}</h1>
      {event.image && <img src={event.image[0]} alt={event.title} />}
      <p>Date: {event.date || "Date not available"}</p>
      <p>Location: {event.location || "Location not available"}</p>
      <p>{event.description || "No description available"}</p>
      <a href={event.link} target="_blank" rel="noopener noreferrer">
        View Original Event
      </a>
    </div>
  );
};

export default EventDetail;

// import React from "react";
// import { useParams } from "react-router-dom";

// const EventDetail = () => {
//   const { id } = useParams();

//   // Fetch the event details based on the ID (use a backend API or state management)
//   // Placeholder example:
//   const event = {
//     id,
//     title: "Example Event Title",
//     description: "Detailed description of the event goes here.",
//     date: "2024-11-20",
//     location: "123 Main St, Los Angeles, CA",
//   };
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   console.log(`event: ${event}`);

//   return (
//     <div>
//       <h1>{event.title}</h1>
//       <p>{event.description}</p>
//       <p>Date: {event.date}</p>
//       <p>Location: {event.location}</p>
//     </div>
//   );
// };

// export default EventDetail;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./EventDetail.css";

// const EventDetail = () => {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     const fetchEventDetail = async () => {
//       try {
//         const response = await axios.get(`/api/events/${id}`);
//         setEvent(response.data);
//       } catch (error) {
//         console.error("Error fetching event details:", error);
//       }
//     };

//     fetchEventDetail();
//   }, [id]);

//   if (!event) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{event.title}</h2>
//       <p>{event.description}</p>
//       <p>Date: {new Date(event.date).toLocaleDateString()}</p>
//       <p>Location: {event.location}</p>
//       <a href={`/book/${event._id}`}>Book Now</a>
//     </div>
//   );
// };

// export default EventDetail;
