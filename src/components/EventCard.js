import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => (
  <div className="event-card">
    <h3>{event.title}</h3>
    <p>{event.category}</p>
    <p>
      {event.date} | {event.time}
    </p>
    <p>{event.location}</p>
    <p>{event.price}</p>
    <button>View Details</button>
  </div>
);

export default EventCard;
