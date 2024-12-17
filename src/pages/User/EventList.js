import React from "react";

const EventList = ({ events }) => {
  return (
    <div className="event-grid">
      {events.length === 0 ? (
        <p>No events found.</p>
    ) : (
        events.map((event) => (
          <div key={event.id} className="event-card">
            {/* Event Image */}
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
            {/* Event Location */}
            <p>
              <strong>Location:</strong> {event.location || "Location unavailable"}
            </p>
            {/* Event Time */}
            <p>
              <strong>Time:</strong> {event.time || "Time not available"}
            </p>
            {/* View Details Link */}
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
  );
};

export default EventList;
