import React from "react";
import { useNavigate } from "react-router-dom";

const EventList = ({ events }) => {
  const navigate = useNavigate();

  const handleEventClick = (id) => {
    navigate(`/events/${id}`); // Updated to events/id from event/id and use the UUID as the unique identifier
  };

  console.log(`events in EventList.js: ${JSON.stringify(events, null, 2)}`);

  return (
    <div className="event-list">
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => handleEventClick(event.id)}
          >
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
                onError={(e) => {
                  console.error(`Image failed to load: ${event.image}`);
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            ) : (
              <div className="no-image-placeholder">
                No image - {event.title}
              </div>
            )}
            <h2>{event.title}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
