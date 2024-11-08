import React, { useEffect, useState, useCallback } from "react";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch events with pagination
  const fetchEvents = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/events?lat=34.0522&lng=-118.2437&limit=20&offset=${offset}`
      );
      const data = await response.json();
      console.log(`data: ${data}`);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...data]);
        setOffset((prevOffset) => prevOffset + 20);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);
  console.log(`offset: ${offset}, loading: ${loading}, hasMore: ${hasMore}`);

  // Initial fetch and infinite scroll
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      fetchEvents();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <h3>{event.title}</h3>
            <p>{event.snippet}</p>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              View Event
            </a>
          </li>
        ))}
      </ul>
      {loading && <p>Loading more events...</p>}
      {!hasMore && <p>No more events to load.</p>}
    </div>
  );
};

export default EventList;

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

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [location, setLocation] = useState({
//     city: "Los Angeles, CA",
//     lat: 34.0522,
//     lng: -118.2437,
//   });
//   const [message, setMessage] = useState("Showing events in Los Angeles, CA");

//   console.log("Location: ", location);

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
//         if (!response.ok) {
//           throw new Error("Error: ${response.status} - ${response.statusText}");
//         }
//         const data = await response.json();
//         setEvents(data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//         console.log(
//           "Unable to fetch events at the moment. Please try again later..."
//         );
//       }
//     };

//     fetchEvents();
//   }, [location]);

//   return (
//     <div>
//       <h1>Upcoming Events</h1>
//       <p>{message}</p>
//       <select onChange={handleCityChange} value={location.city}>
//         {cities.map((city) => (
//           <option key={city.name} value={city.name}>
//             {city.name}
//           </option>
//         ))}
//       </select>
//       <ul>
//         {events.map((event, index) => (
//           <li key={index}>
//             <h2>{event.title}</h2>
//             <p>{event.snippet}</p>
//             <a href={event.link} target="_blank" rel="noopener noreferrer">
//               View Event
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default EventList;

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

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [location, setLocation] = useState({
//     city: "Los Angeles, CA",
//     lat: 34.0522,
//     lng: -118.2437,
//   });
//   const [message, setMessage] = useState("Showing events in Los Angeles, CA");

//   // Handle location permission to use user's location
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

//   // Handle city selection from dropdown
//   const handleCityChange = (event) => {
//     const selectedCity = cities.find(
//       (city) => city.name === event.target.value
//     );
//     setLocation(selectedCity);
//     setMessage(`Showing events in ${selectedCity.name}`);
//   };

//   useEffect(() => {
//     // Request user's location on component mount
//     handleLocationPermission();

//     const fetchEvents = async () => {
//       try {
//         // Fetch events from API, using location-based filtering
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

// export default EventList;

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

// const EventList = () => {
//   const [events, setEvents] = useState([]);
//   const [location, setLocation] = useState({
//     city: "Los Angeles, CA",
//     lat: 34.0522,
//     lng: -118.2437,
//   });
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("Showing events in Los Angeles, CA");

//   // Handle location permission to use user's location
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

//   // Handle city selection from dropdown
//   const handleCityChange = (event) => {
//     const selectedCity = cities.find(
//       (city) => city.name === event.target.value
//     );
//     setLocation(selectedCity);
//     setMessage(`Showing events in ${selectedCity.name}`);
//   };

//   useEffect(() => {
//     // Request user's location on component mount
//     handleLocationPermission();

//     const fetchEvents = async () => {
//       const googleAccessToken = localStorage.getItem("google_access_token");
//       if (!googleAccessToken) {
//         setError("Please log in with Google to view events.");
//         return;
//       }

//       try {
//         // Fetch events from API, using location-based filtering
//         const response = await fetch(
//           `${process.env.REACT_APP_API_BASE_URL}/api/events?access_token=${googleAccessToken}&lat=${location.lat}&lng=${location.lng}`
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

// export default EventList;

// 3.
// import React, { useState, useEffect } from "react";
// // import EventCard from "../../components/EventCard";
// // import Calendar from "react-calendar";
// import "./EventList.css";

// const EventList = () => {
//   const [activities, setActivities] = useState([]);
//   const [visibleActivities, setVisibleActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [offset, setOffset] = useState(0);
//   const limit = 20; // Number of activities to show at a time

//   const API_BASE_URL =
//     process.env.REACT_APP_API_URL || "https://kovebox.com/api";

//   // Fetch all activities from the backend when the component mounts
//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const response = await fetch(
//           { API_BASE_URL },
//           // "https://localhost:5000/api/scrape/activities",

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

//         const data = await response.json();

//         if (data.success) {
//           setActivities(data.data); // Store all activities
//           setVisibleActivities(data.data.slice(0, limit)); // Show only the first 10 activities
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

//   // Function to load more activities when scrolling
//   const loadMoreActivities = () => {
//     const nextOffset = offset + limit;
//     const moreActivities = activities.slice(nextOffset, nextOffset + limit);

//     // Check if there are more activities to load
//     if (moreActivities.length > 0) {
//       setVisibleActivities((prevActivities) => [
//         ...prevActivities,
//         ...moreActivities,
//       ]);
//       setOffset(nextOffset);
//     }
//   };

//   // Event listener for scrolling to load more activities
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.innerHeight + window.scrollY;
//       const threshold = document.body.offsetHeight - window.innerHeight / 2;

//       // Check if user has scrolled near the bottom and there are more activities to load
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

//   // Display loading, error, or the list of activities
//   if (loading) {
//     return <div>Loading activities...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Activities from Eventbrite</h2>
//       {visibleActivities.length === 0 ? (
//         <p>No activities found.</p>
//       ) : (
//         <ul>
//           {visibleActivities.map((activity, index) => (
//             <li key={index}>
//               <h3>{activity.title}</h3>
//               <p>Date: {activity.date}</p>
//               <p>Location: {activity.location}</p>
//               <a href={activity.link} target="_blank" rel="noopener noreferrer">
//                 View Event
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default EventList;
