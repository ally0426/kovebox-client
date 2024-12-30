import React from "react";

const EventList = ({ events }) => {
  return (
<<<<<<< HEAD
    <div className="container mx-auto px-4">
      {error && <p>{error}</p>}
      {events.length === 0 && !error && <p>No events found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden text-center flex flex-col justify-between"
          >
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
            ) : (
              <p>No image available</p>
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{event.snippet}</p>
            </div>

            <div className="p-4">
              <a
                href={event.contextLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                View Details
              </a>
            </div>
=======
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
>>>>>>> 55622ff61bc08a77c08b32cd217d89905f2959fd
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
