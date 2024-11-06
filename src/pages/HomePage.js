import EventList from "./User/EventList";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Kovebox Events</h1>
      <p>
        Explore upcoming events related to Korean culture, K-pop, and Korean
        food.
      </p>
      <EventList />
    </div>
  );
};

export default HomePage;

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
