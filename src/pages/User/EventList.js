import React from "react";

const EventList = ({ events }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center text-center"
          >
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
                style={{ objectFit: "cover", width: "100%", height: "150px" }}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
