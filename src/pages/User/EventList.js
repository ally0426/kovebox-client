import React, { useState, useEffect } from "react";
import { fetchScrapedEvents } from "../../services/eventService";
import EventCard from "../../components/EventCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./EventList.css";
import "./pagination.css";

const EventList = () => {
  const [activities, setActivities] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 10; // Number of activities to show at a time
  // Fetch all activities from the backend when the component mounts
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/scrape/eventbrite"
        );
        const data = await response.json();

        if (data.success) {
          setActivities(data.data); // Store all activities
          setVisibleActivities(data.data.slice(0, limit)); // Show only the first 10 activities
        } else {
          setError("Failed to fetch activities");
        }
      } catch (err) {
        setError("An error occurred while fetching activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Function to load more activities when scrolling
  const loadMoreActivities = () => {
    const nextOffset = offset + limit;
    const moreActivities = activities.slice(nextOffset, nextOffset + limit);

    // Check if there are more activities to load
    if (moreActivities.length > 0) {
      setVisibleActivities((prevActivities) => [
        ...prevActivities,
        ...moreActivities,
      ]);
      setOffset(nextOffset);
    }
  };

  // Event listener for scrolling to load more activities
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - window.innerHeight / 2;

      // Check if user has scrolled near the bottom and there are more activities to load
      if (
        scrollPosition >= threshold &&
        !loading &&
        activities.length > visibleActivities.length
      ) {
        loadMoreActivities();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, activities, visibleActivities]);

  // Display loading, error, or the list of activities
  if (loading) {
    return <div>Loading activities...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Activities from Eventbrite</h2>
      {visibleActivities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <ul>
          {visibleActivities.map((activity, index) => (
            <li key={index}>
              <h3>{activity.title}</h3>
              <p>Date: {activity.date}</p>
              <p>Location: {activity.location}</p>
              <a href={activity.link} target="_blank" rel="noopener noreferrer">
                View Event
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
