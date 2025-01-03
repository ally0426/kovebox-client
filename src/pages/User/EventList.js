import React, { useState, useEffect } from "react";
import "./EventList.css";
import axios from "axios";

const EventList = ({ events }) => {
  const [events, setEvents] = useState([])
  // const [location, setLocation] = useState( { latitude: null, longitude: null})
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0) // Keeps track of the offset for pagination
  // const [error, setError] = useState(null)



  // Function to load events
  const loadEvents = async () => {
    if (loading) return; // Prevent multiple requests at the same time
    setLoading(true);
    try {
      const response = await axios.get("https://kovebox-server-90387d3b18a6.herokuapp.com/api/events", {
        params: {
          offset: offset,
          limit: 30, // You can just this based on how many events you want per scroll
          latitude: 
        }
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* {error && <p>{error}</p>} */}
      {/* {events.length === 0 ? <p>No events found.</p> : "Korean Events"} */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
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
