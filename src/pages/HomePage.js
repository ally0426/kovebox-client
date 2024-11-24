import React, { useState, useEffect } from "react";
import axios from "axios";
import EventList from "./User/EventList";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState("Los Angeles, CA"); // Default location
  const [keywords, setKeywords] = useState("Korean events"); // Default keyword
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        setLocation("Los Angeles, CA"); // Fallback
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("User Coordinates:", { lat, lon });

          try {
            // Fetch geolocation from the backend
            const response = await axios.get(
              `https://kovebox-server-90387d3b18a6.herokuapp.com/api/geolocation`,
              {
                params: { lat, lon },
              }
            );

            const { city, state } = response.data;
            setLocation(`${city}, ${state}`);
            console.log("Detected Location:", `${city}, ${state}`);
          } catch (err) {
            console.error("Error fetching geolocation:", err.message);
            setLocation("Los Angeles, CA"); // Fallback
          }
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          setLocation("Los Angeles, CA"); // Fallback
        }
      );
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    // Fetch events based on location and keywords
    const fetchEvents = async () => {
      try {
        const query = `${keywords} in ${location}`;
        const apiUrl = `https://kovebox-server-90387d3b18a6.herokuapp.com/api/search?q=${encodeURIComponent(
          query
        )}`;
        console.log("Fetching from:", apiUrl); // Log the API URL for debugging
        const response = await axios.get(apiUrl);

        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching events:", err.message);
        setError("Failed to load events.");
      }
    };

    fetchEvents();
  }, [keywords, location]); // Refetch when keywords or location change

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Events</h1>
      <div>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </label>
        <label>
          Keywords:
          <select
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          >
            <option value="Korean events">Korean events</option>
            <option value="K-pop events">K-pop events</option>
            <option value="Korean cooking events">Korean cooking events</option>
            <option value="Korean cultural events">
              Korean cultural events
            </option>
            <option value="Korean language events">
              Korean language events
            </option>
          </select>
        </label>
      </div>
      <EventList events={events} />
    </div>
  );
};

export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EventList from "./User/EventList";

// const HomePage = () => {
//   const [events, setEvents] = useState([]);
//   const [location, setLocation] = useState("Los Angeles, CA"); // Default location
//   const [keywords, setKeywords] = useState("Korean events"); // Default keyword
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const detectLocation = async () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;

//             console.log("User coordinates:", { lat, lon });

//             try {
//               const response = await fetch(
//                 `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY`
//               );
//               const data = await response.json();
//               console.log("Google Geocoding Response:", data); // Log the full response
//               console.log(
//                 "google geocoing api key",
//                 process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY
//               ); // Log the geocoding api key

//               if (data.results.length > 0) {
//                 // Extract city and state from the response
//                 const components = data.results[0].address_components;
//                 const city =
//                   components.find((c) => c.types.includes("locality"))
//                     ?.long_name || "Unknown City";
//                 const state =
//                   components.find((c) =>
//                     c.types.includes("administrative_area_level_1")
//                   )?.short_name || "Unknown State";
//                 setLocation(`${city}, ${state}`);
//                 console.log("Detected location:", `${city}, ${state}`);
//               } else {
//                 console.error("No location found from Google API");
//                 setLocation("Los Angeles, CA"); // Fallback
//               }
//             } catch (err) {
//               console.error("Error fetching location from Google API:", err);
//               setLocation("Los Angeles, CA"); // Fallback
//             }
//             // try {
//             //   // Fetch location based on latitude and longitude
//             //   const response = await fetch(
//             //     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//             //   );
//             //   const data = await response.json();
//             //   console.log("Reverse Gelocoding Response: ", data); // Log the full response for debugging

//             //   const city =
//             //     data.address.city ||
//             //     data.address.town ||
//             //     data.address.village ||
//             //     data.address.hamlet ||
//             //     "Unknown City";
//             //   const state = data.address.state || "UnKnown State";
//             //   setLocation(`${city}, ${state}`);
//             //   console.log("Detected location:", `${city}, ${state}`);
//             // } catch (err) {
//             //   console.error("Error fetching location from coordinates:", err);
//             //   setLocation("Los Angeles, CA"); // Fallback to default
//             // }
//           },
//           (error) => {
//             // Handle geolocation errors
//             console.error("Geolocation error:", error.message);
//             switch (error.code) {
//               case error.PERMISSION_DENIED:
//                 console.error("User denied the request for Geolocation.");
//                 break;
//               case error.POSITION_UNAVAILABLE:
//                 console.error("Location information is unavailable.");
//                 break;
//               case error.TIMEOUT:
//                 console.error("The request to get user location timed out.");
//                 break;
//               default:
//                 console.error("An unknown error occurred.");
//             }
//             setLocation("Los Angeles, CA"); // Fallback to default
//           }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//         setLocation("Los Angeles, CA"); // Fallback to default
//       }
//     };

//     detectLocation();
//   }, []);

//   // useEffect(() => {
//   //   // Detect user location
//   //   if (navigator.geolocation) {
//   //     navigator.geolocation.getCurrentPosition(
//   //       (position) => {
//   //         const lat = position.coords.latitude;
//   //         const lon = position.coords.longitude;

//   //         // Fetch location based on lat/lon
//   //         fetch(
//   //           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//   //         )
//   //           .then((res) => res.json())
//   //           .then((data) => {
//   //             const city =
//   //               data.address.city || data.address.town || "Los Angeles";
//   //             const state = data.address.state || "CA";
//   //             setLocation(`${city}, ${state}`);
//   //           })
//   //           .catch((err) => {
//   //             console.error("Error fetching location:", err);
//   //             setLocation("Los Angeles, CA"); // Fallback
//   //           });
//   //       },
//   //       (error) => {
//   //         console.error("Geolocation error:", error);
//   //         setLocation("Los Angeles, CA"); // Fallback
//   //       }
//   //     );
//   //   }
//   // }, []);

//   useEffect(() => {
//     // Fetch events based on location and keywords
//     const fetchEvents = async () => {
//       try {
//         const query = `${keywords} in ${location}`;
//         const apiUrl = `https://kovebox-server-90387d3b18a6.herokuapp.com/api/search?q=${encodeURIComponent(
//           query
//         )}`;
//         console.log("Fetching from:", apiUrl); // Log the API URL for debugging
//         const response = await axios.get(apiUrl);

//         console.log("API Response:", response.data);

//         if (Array.isArray(response.data)) {
//           setEvents(response.data);
//         } else {
//           throw new Error("Unexpected response format");
//         }
//       } catch (err) {
//         console.error("Error fetching events:", err.message);
//         setError("Failed to load events.");
//       }
//     };

//     fetchEvents();
//   }, [keywords, location]); // Refetch when keywords or location change

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Events in {location}</h1>
//       <div>
//         <label>
//           Location:
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Enter location"
//           />
//         </label>
//         <label>
//           Keywords:
//           <select
//             value={keywords}
//             onChange={(e) => setKeywords(e.target.value)}
//           >
//             <option value="Korean events">Korean events</option>
//             <option value="K-pop events">K-pop events</option>
//             <option value="Korean cooking events">Korean cooking events</option>
//             <option value="Korean cultural events">
//               Korean cultural events
//             </option>
//             <option value="Korean language events">
//               Korean language events
//             </option>
//           </select>
//         </label>
//       </div>
//       <EventList events={events} />
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EventList from "./User/EventList";

// const HomePage = () => {
//   const [events, setEvents] = useState([]);
//   const [location, setLocation] = useState("Los Angeles, CA"); // Default location
//   const [keywords, setKeywords] = useState("Korean events"); // Default keyword
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Detect user location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = position.coords.latitude;
//           const lon = position.coords.longitude;

//           // Fetch location based on lat/lon
//           fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//           )
//             .then((res) => res.json())
//             .then((data) => {
//               const city =
//                 data.address.city || data.address.town || "Los Angeles";
//               const state = data.address.state || "CA";
//               setLocation(`${city}, ${state}`);
//             })
//             .catch((err) => {
//               console.error("Error fetching location:", err);
//               setLocation("Los Angeles, CA"); // Fallback
//             });
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//           setLocation("Los Angeles, CA"); // Fallback
//         }
//       );
//     }
//   }, []);

//   useEffect(() => {
//     // Fetch events based on location and keywords
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(
//           `https://kovebox-server-90387d3b18a6.herokuapp.com/api/search`,
//           {
//             params: {
//               q: keywords, // User-selected keywords
//               location, // User-selected or detected location
//             },
//           }
//         );

//         console.log("API Response:", response.data);
//         console.log(`location - keywords: ${location} - ${keywords}`);

//         if (Array.isArray(response.data)) {
//           setEvents(response.data);
//         } else {
//           throw new Error("Unexpected response format");
//         }
//       } catch (err) {
//         console.error("Error fetching events:", err.message);
//         setError("Failed to load events.");
//       }
//     };

//     fetchEvents();
//   }, [keywords, location]); // Refetch when keywords or location change

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Events</h1>
//       <div>
//         <label>
//           Location:
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Enter location"
//           />
//         </label>
//         <label>
//           Keywords:
//           <select
//             value={keywords}
//             onChange={(e) => setKeywords(e.target.value)}
//           >
//             <option value="Korean events">Korean events</option>
//             <option value="K-pop events">K-pop events</option>
//             <option value="Korean cooking events">Korean cooking events</option>
//             <option value="Korean cultural events">
//               Korean cultural events
//             </option>
//             <option value="Korean language events">
//               Korean language events
//             </option>
//           </select>
//         </label>
//       </div>
//       <EventList events={events} />
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EventList from "./User/EventList";

// const HomePage = () => {
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(
//           "https://kovebox-server-90387d3b18a6.herokuapp.com/api/search?q=Korean+events+Los+Angeles+this+weekend"
//         );
//         console.log("API Response:", response.data);

//         // Ensure `response.data` is an array
//         if (Array.isArray(response.data)) {
//           setEvents(response.data);
//         } else {
//           throw new Error("Unexpected response format");
//         }
//       } catch (err) {
//         console.error("Error fetching events:", err.message);
//         setError("Failed to load events.");
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Events</h1>
//       <EventList events={events} />
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EventList from "./User/EventList"; // Path based on your setup

// const HomePage = () => {
//   const [events, setEvents] = useState([]); // Ensure `events` starts as an empty array
//   const [error, setError] = useState(""); // For error handling

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(
//           "/api/search?q=Korean+events+Los+Angeles+this+weekend"
//         );
//         console.log("API Response:", response.data);

//         // Ensure `response.data` is an array before setting it
//         if (Array.isArray(response.data)) {
//           setEvents(response.data);
//         } else {
//           console.error("Unexpected response format:", response.data);
//           setEvents([]); // Default to an empty array
//         }
//       } catch (err) {
//         console.error("Error fetching events:", err.message);
//         setError("Failed to load events.");
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Show error message if there's an error
//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Events</h1>
//       <EventList events={events} />
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const HomePage = () => {
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");

//   const fetchSearchResults = async () => {
//     try {
//       const response = await axios.get("/api/search", {
//         params: { q: "kpop events Los Angeles this weekend" },
//       });
//       setResults(response.data);
//     } catch (err) {
//       console.error("Error fetching search results:", err);
//       setError("Failed to fetch results.");
//     }
//   };

//   useEffect(() => {
//     fetchSearchResults();
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to Kovebox Events</h1>
//       <p>Explore K-pop and Korean cultural events near you!</p>
//       {error && <p>{error}</p>}
//       <div className="image-results">
//         console.log('Results: ', results)
//         {results &&
//           results.map((result, index) => (
//             <div key={index} className="image-card">
//               <a
//                 href={result.contextLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img src={result.link} alt={result.title} />
//               </a>
//               <p>{result.title}</p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EventList from "./User/EventList"; // Correct path to EventList.js

// const HomePage = () => {
//   const defaultLocation = { lat: 34.0522, lng: -118.2437 }; // Los Angeles coordinates
//   const [location, setLocation] = useState(defaultLocation);
//   const [events, setEvents] = useState([]); // Initialize as an empty array
//   const [error, setError] = useState("");

//   // Fetch events based on location
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("/api/events", {
//         params: { lat: location.lat, lng: location.lng },
//       });
//       console.log("API response:", response.data); // Log the API response
//       setEvents(response.data || []); // Directly use the response data as the events array
//     } catch (err) {
//       console.error("Error fetching events:", err);
//       setError("Failed to fetch events");
//     }
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setLocation(userLocation);
//           fetchEvents();
//         },
//         (error) => {
//           console.warn("Geolocation error:", error);
//           fetchEvents(); // Use default location
//         }
//       );
//     } else {
//       fetchEvents(); // Use default location if geolocation is unsupported
//     }
//   }, [location]); // Re-fetch events whenever location changes

//   return (
//     <div>
//       <h1>Welcome to Kovebox Events</h1>
//       <p>Explore Korean events near you!</p>
//       {error && <p>{error}</p>}
//       {console.log("Events passed to EventList:", events)} {/* Log events */}
//       <EventList events={events} /> {/* Pass events directly */}
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EventList from "./User/EventList"; // Correct file path for EventList

// const HomePage = () => {
//   const defaultLocation = { lat: 34.0522, lng: -118.2437 }; // Los Angeles coordinates
//   const [location, setLocation] = useState(defaultLocation);
//   const [events, setEvents] = useState([]); // Initialize as an empty array
//   const [error, setError] = useState("");

//   // Fetch events based on location
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("/api/events", {
//         params: { lat: location.lat, lng: location.lng },
//       });
//       console.log("API response:", response.data); // Log the API response
//       setEvents(response.data || []); // Directly use the response data as the events array
//     } catch (err) {
//       console.error("Error fetching events:", err);
//       setError("Failed to fetch events");
//     }
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setLocation(userLocation);
//           fetchEvents();
//         },
//         (error) => {
//           console.warn("Geolocation error:", error);
//           fetchEvents(); // Use default location
//         }
//       );
//     } else {
//       fetchEvents(); // Use default location if geolocation is unsupported
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to Kovebox Events</h1>
//       <p>Explore Korean events near you!</p>
//       {error && <p>{error}</p>}
//       {console.log("Events passed to EventList:", events)} {/* Log events */}
//       <EventList events={events} /> {/* Pass events directly */}
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import EventList from "./User/EventList"; // Import the EventList component

// const HomePage = () => {
//   // Default to Los Angeles if geolocation is denied or unavailable
//   const defaultLocation = { lat: 34.0522, lng: -118.2437 }; // Los Angeles coordinates
//   const [location, setLocation] = useState(defaultLocation);
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState("");

//   // Function to fetch events based on the current location
//   const fetchEvents = async (lat, lng) => {
//     try {
//       const response = await axios.get(`/api/events`, {
//         params: { lat, lng },
//       });
//       console.log("API response - event[0]: ${response.data.event[0]}");
//       setEvents(response.data.events || []); // Assuming response data structure contains events array
//     } catch (err) {
//       console.error("Error fetching events:", err);
//       setError("Failed to fetch events");
//     }
//   };

//   useEffect(() => {
//     // Check for browser geolocation support
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           console.log(`user location: ${userLocation}`);
//           setLocation(userLocation); // Set the user's location
//           fetchEvents(userLocation.lat, userLocation.lng); // Fetch events based on user's location
//         },
//         (error) => {
//           console.warn("Geolocation permission denied or unavailable:", error);
//           // Use default location if permission denied or geolocation fails
//           fetchEvents(defaultLocation.lat, defaultLocation.lng);
//         }
//       );
//     } else {
//       console.warn("Geolocation not supported by this browser.");
//       // Use default location if geolocation is not supported
//       fetchEvents(defaultLocation.lat, defaultLocation.lng);
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to Kovebox Events</h1>
//       <p>
//         Explore upcoming events related to Korean culture, K-pop, and Korean
//         food.
//       </p>
//       <h2>Upcoming Events</h2>
//       {error && <p>{error}</p>}
//       {events && events.length > 0 ? (
//         <EventList events={events} />
//       ) : (
//         <p>No events found for this location.</p>
//       )}
//     </div>
//   );
// };

// export default HomePage;

// import EventList from "./User/EventList";

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Welcome to Kovebox Events</h1>
//       <p>
//         Explore upcoming events related to Korean culture, K-pop, and Korean
//         food.
//       </p>
//       <EventList />
//     </div>
//   );
// };

// export default HomePage;

// // 1.
// import React, { useEffect, useState } from "react";

// const cities = [
//   { name: "New York, NY", lat: 40.7128, lng: -74.006 },
//   { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
//   { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
//   { name: "Houston, TX", lat: 29.7604, lng: -95.3698 },
//   { name: "Phoenix, AZ", lat: 33.4484, lng: -112.074 },
//   { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
//   { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
//   { name: "Boston, MA", lat: 42.3601, lng: -71.0589 },
//   { name: "Miami, FL", lat: 25.7617, lng: -80.1918 },
// ];

// const HomePage = () => {
//   const [events, setEvents] = useState([]);
//   const [location, setLocation] = useState({
//     city: "Los Angeles, CA",
//     lat: 34.0522,
//     lng: -118.2437,
//   });
//   const [message, setMessage] = useState("Showing events in Los Angeles, CA");

//   const handleLocationPermission = () => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           city: "Your Current Location",
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//         setMessage("Showing events based on your current location");
//       },
//       () => {
//         setMessage(
//           "Location access denied. Showing events for Los Angeles, CA."
//         );
//       }
//     );
//   };

//   const handleCityChange = (event) => {
//     const selectedCity = cities.find(
//       (city) => city.name === event.target.value
//     );
//     setLocation(selectedCity);
//     setMessage(`Showing events in ${selectedCity.name}`);
//   };

//   useEffect(() => {
//     handleLocationPermission();

//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_API_BASE_URL}/api/events?lat=${location.lat}&lng=${location.lng}`
//         );
//         const data = await response.json();
//         setEvents(data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, [location]);

//   return (
//     <div>
//       <h1>Upcoming Events</h1>
//       <p>{message}</p>
//       <div>
//         <label htmlFor="city-select">Select a city:</label>
//         <select
//           id="city-select"
//           onChange={handleCityChange}
//           value={location.city}
//         >
//           {cities.map((city) => (
//             <option key={city.name} value={city.name}>
//               {city.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <ul>
//         {events.map((event, index) => (
//           <li key={index}>
//             <h2>{event.title}</h2>
//             <p>Date: {event.date}</p>
//             <p>Location: {event.location}</p>
//             <a href={event.link} target="_blank" rel="noopener noreferrer">
//               View Event
//             </a>
//             <p>Source: {event.source}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HomePage;

// 2.
// import React, { useEffect, useState } from "react";

// const cities = [
//   { name: "New York, NY", lat: 40.7128, lng: -74.006 },
//   { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
//   { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
//   { name: "Houston, TX", lat: 29.7604, lng: -95.3698 },
//   { name: "Phoenix, AZ", lat: 33.4484, lng: -112.074 },
//   { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
//   { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
//   { name: "Boston, MA", lat: 42.3601, lng: -71.0589 },
//   { name: "Miami, FL", lat: 25.7617, lng: -80.1918 },
// ];

// const HomePage = () => {
//   const [events, setEvents] = useState([]);
//   const [location, setLocation] = useState({
//     city: "Los Angeles, CA",
//     lat: 34.0522,
//     lng: -118.2437,
//   });
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("Showing events in Los Angeles, CA");

//   const handleLocationPermission = () => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           city: "Your Current Location",
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//         setMessage("Showing events based on your current location");
//       },
//       () => {
//         setError("Location access denied. Showing events for Los Angeles, CA.");
//       }
//     );
//   };

//   const handleCityChange = (event) => {
//     const selectedCity = cities.find(
//       (city) => city.name === event.target.value
//     );
//     setLocation(selectedCity);
//     setMessage(`Showing events in ${selectedCity.name}`);
//   };

//   useEffect(() => {
//     // Request user's location on initial load
//     handleLocationPermission();

//     const fetchEvents = async () => {
//       const googleAccessToken = localStorage.getItem("google_access_token");
//       if (!googleAccessToken) {
//         setError("Please log in with Google to view events.");
//         return;
//       }

//       try {
//         // Fetch events with location-based filtering (lat & lng as query params)
//         const response = await fetch(
//           `/api/events?access_token=${googleAccessToken}&lat=${location.lat}&lng=${location.lng}`
//         );
//         const data = await response.json();
//         setEvents(data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//         setError("Error fetching events. Please try again.");
//       }
//     };

//     fetchEvents();
//   }, [location]);

//   return (
//     <div>
//       <h1>Upcoming Events</h1>
//       <p>{message}</p>
//       <div>
//         <label htmlFor="city-select">Select a city:</label>
//         <select
//           id="city-select"
//           onChange={handleCityChange}
//           value={location.city}
//         >
//           {cities.map((city) => (
//             <option key={city.name} value={city.name}>
//               {city.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {error && (
//         <div>
//           <p>{error}</p>
//         </div>
//       )}
//       <ul>
//         {events.map((event, index) => (
//           <li key={index}>
//             <h2>{event.title}</h2>
//             <p>Date: {event.date}</p>
//             <p>Location: {event.location}</p>
//             <a href={event.link} target="_blank" rel="noopener noreferrer">
//               View Event
//             </a>
//             <p>Source: {event.source}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default HomePage;

// 3.
// import React, { useEffect, useState } from "react";
// import "./HomePage.css"; // Import the CSS file for styling

// const HomePage = () => {
//   const [activities, setActivities] = useState([]);
//   const [visibleActivities, setVisibleActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [offset, setOffset] = useState(0);
//   const limit = 10;
//   // const API_BASE_URL = process.env.REACT_APP_API_URL || "https://kovebox-server-eta.vercel.app/api";

//   useEffect(() => {
//     const fetchActivities = async () => {
//       console.log("loading fetchActivities in HomePage.js...");
//       try {
//         const response = await fetch(
//           // { API_BASE_URL },
//           "http://localhost:5000/api/scrape/activities",
//           // "http://localhost:5000/api/scrape/eventbrite",
//           // "{`${API_BASE_URL}/scrape/eventbrite`}",
//           // "https://kovebox-server-eta.vercel.app/api",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//           }
//         );
//         if (!response.ok) {
//           throw new Error(response.statusText);
//         }
//         // console.log(`API_BASE_URL: ${API_BASE_URL}`);
//         const data = await response.json();

//         if (data.success) {
//           setActivities(data.data);
//           setVisibleActivities(data.data.slice(0, limit));
//         } else {
//           setError("Failed to fetch activities");
//         }
//       } catch (err) {
//         setError("An error occurred while fetching activities");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActivities();
//   }, []);

//   const loadMoreActivities = () => {
//     const nextOffset = offset + limit;
//     const moreActivities = activities.slice(nextOffset, nextOffset + limit);

//     if (moreActivities.length > 0) {
//       setVisibleActivities((prevActivities) => [
//         ...prevActivities,
//         ...moreActivities,
//       ]);
//       setOffset(nextOffset);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.innerHeight + window.scrollY;
//       const threshold = document.body.offsetHeight - window.innerHeight / 2;

//       if (
//         scrollPosition >= threshold &&
//         !loading &&
//         activities.length > visibleActivities.length
//       ) {
//         loadMoreActivities();
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [loading, activities, visibleActivities, loadMoreActivities]);

//   if (loading) {
//     return <div>Loading activities...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="homepage">
//       <h2 className="homepage-title">Kovebox - All about Korea!</h2>
//       {visibleActivities.length === 0 ? (
//         <p>No activities found.</p>
//       ) : (
//         <div className="card-container">
//           {visibleActivities.map((activity, index) => (
//             <div key={index} className="card">
//               <h3 className="card-title">{activity.title}</h3>
//               <p className="card-date">Date: {activity.date}</p>
//               <p className="card-location">Location: {activity.location}</p>
//               <a
//                 href={activity.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="card-link"
//               >
//                 View Event
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;
