import React, { useState, useEffect } from "react";
import axios from "axios";

const EventList = ({ location }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // Fetch events based on location
  useEffect(() => {
    const fetchEvents = async () => {
      if (!location.latitude || !location.longitude) return;

      try {
        console.log("Fetching events with params:", {
          offset,
          limit,
          latitude: location.latitude,
          longitude: location.longitude,
        });

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

        console.log("Fetched events from server:", response.data);
        setEvents((prevEvents) => [...prevEvents, ...response.data]);
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setError("Failed to fetch events.");
      }
    };

    fetchEvents();
  }, [location, offset]);

  // Infinite scroll handler
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState("");
//   const [location, setLocation] = useState({ latitude: null, longitude: null });
//   const [offset, setOffset] = useState(0);
//   const limit = 10; // Number of events per request

//   // Detect user location
//   useEffect(() => {
//     const detectLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//           },
//           (error) => {
//             console.error("Geolocation error defaulted to LA, CA:", error.message);
//             setLocation({ latitude: 34.0522, longitude: -118.2437 }); // Default to Los Angeles, CA
//           }
//         );
//       } else {
//         console.warn("Geolocation not supported by this browser defaulted to LA, CA.");
//         setLocation({ latitude: 34.0522, longitude: -118.2437 });
//       }
//     };

//     detectLocation();
//   }, []);

//   // Fetch events from API
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         console.log("Requesting events with:", {
//           offset,
//           limit,
//           latitude: location.latitude,
//           longitude: location.longitude,
//         });
//         const response = await axios.get(
//           `https://kovebox-server-90387d3b18a6.herokuapp.com/api/events`,
//           {
//             params: {
//               offset,
//               limit,
//               latitude: location.latitude,
//               longitude: location.longitude,
//             },
//           }
//         );

//         console.log("Server response status: ", response.status);
//         console.log(
//           "Server response data:",
//           JSON.stringify(response.data, null, 2)
//         );

// if (response.status === 404) {
//   console.error("No events found. 404 error");
//   setError("No events found. 404 error");
// } else if (response.status === 200) {
//           setEvents((prevEvents) => [...prevEvents, ...response.data]);
//         } else {
//           console.log("Unexpected server sattus: ", response.status);
//           setError("Failed to fetch events", response.status);
//         }
//       } catch (err) {
//         console.error(
//           "Error fetching events: ",
//           err.response?.status || err.message,
//           err.respnose?.data || ""
//         );
//         setError("Failed to fetch events.");
//       }
//     };

//     if (location.latitude && location.longitude) {
//       fetchEvents();
//     }
//   }, [location, offset]);

//   // Infinite scroll handler
//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop >=
//       document.documentElement.offsetHeight - 500
//     ) {
//       setOffset((prevOffset) => prevOffset + limit);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       {events.length === 0 && !error && <p>No events found.</p>}
//       <div className="event-grid">
//         {events.map((event) => (
//           <div key={event.id} className="event-card">
//             {event.image ? (
//               <img src={event.image} alt={event.title} />
//             ) : (
//               <p>No image available</p>
//             )}
//             <h3>{event.title}</h3>
//             <p>{event.snippet}</p>
//             <a
//               href={event.contextLink}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               View Details
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EventList;
