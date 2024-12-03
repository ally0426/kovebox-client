import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState(null); // User's location
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true); // Tracks if more data is available
  const limit = 10; // Number of events per load
  const navigate = useNavigate();

  // Detect user's location
  useEffect(() => {
    const detectLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error detecting location:", error.message);
            // Default to Los Angeles, CA
            setLocation({ latitude: 34.0522, longitude: -118.2437 });
          }
        );
      } else {
        console.error("Geolocation not supported by this browser.");
        // Default to Los Angeles, CA
        setLocation({ latitude: 34.0522, longitude: -118.2437 });
      }
    };

    detectLocation();
  }, []);

  // Fetch events
  const fetchEvents = async () => {
    if (!location) return;

    try {
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

      const newEvents = response.data;
      if (newEvents.length === 0) {
        setHasMore(false); // No more events to load
      } else {
        setEvents((prevEvents) => [...prevEvents, ...newEvents]); // Append new events
      }
    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  };

  // Trigger fetching events on component mount and when offset changes
  useEffect(() => {
    if (location) {
      fetchEvents();
    }
  }, [location, offset]);

  // Handle scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore
    ) {
      setOffset((prevOffset) => prevOffset + limit); // Increment offset to fetch next page
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="event-list">
      {events.length === 0 ? (
        <p>Loading events...</p>
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
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            ) : (
              <div className="placeholder-image">No Image</div>
            )}
            <h2>{event.title}</h2>
          </div>
        ))
      )}
      {!hasMore && <p>No more events to load.</p>}
    </div>
  );
};

export default EventList;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const EventList = ({ events }) => {
//   const navigate = useNavigate();

//   const handleEventClick = (id) => {
//     navigate(`/events/${id}`); // Updated to events/id from event/id and use the UUID as the unique identifier
//   };

//   console.log(`events in EventList.js: ${JSON.stringify(events, null, 2)}`);

//   return (
//     <div className="event-list">
//       {events.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         events.map((event) => (
//           <div
//             key={event.id}
//             className="event-card"
//             onClick={() => handleEventClick(event.id)}
//           >
//             {event.image ? (
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="event-image"
//                 onError={(e) => {
//                   console.error(`Image failed to load: ${event.image}`);
//                   e.target.src = "https://via.placeholder.com/150";
//                 }}
//               />
//             ) : (
//               <div className="no-image-placeholder">
//                 No image - {event.title}
//               </div>
//             )}
//             <h2>{event.title}</h2>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default EventList;
