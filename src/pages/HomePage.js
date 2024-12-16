import React, { useState, useEffect } from "react";
import EventList from "./User/EventList";

const HomePage = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [useUserLocation, setUseUserLocation] = useState(false);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setUseUserLocation(true);
          alert(`User location detected: ${position.coords.latitude}` ${position.coord.longitude});
        },
        (err) => {
          console.error("Geolocation error:", err.message);
          alert("Unable to detect location. Please enter a location manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = () => {
    alert(`searchQuery: ${searchQuery}`);
    if (searchQuery.trim() === "") {
      alert("Please enter a valid location.");
    } else {
      setUseUserLocation(false); // Use manual search location
      setLocation({ searchQuery });
    }
  };

  useEffect(() => {
    if (!useUserLocation && !searchQuery) {
      setLocation({ searchQuery: "United States" }); // Default to all USA events
    }
  }, [useUserLocation, searchQuery]);

  return (
    <div>
      <div className="controls">
        <button onClick={fetchUserLocation}>SHOW MY AREA</button>
        <input
          type="text"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>SEARCH</button>
      </div>
      <EventList
        location={useUserLocation ? location : null}
        searchQuery={!useUserLocation ? location.searchQuery : null}
      />
    </div>
  );
};

export default HomePage;
