import React, { useEffect, useState } from "react";
import "./HomePage.css"; // Import the CSS file for styling

const HomePage = () => {
  const [activities, setActivities] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/scrape/eventbrite"
        );
        const data = await response.json();

        if (data.success) {
          setActivities(data.data);
          setVisibleActivities(data.data.slice(0, limit));
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

  const loadMoreActivities = () => {
    const nextOffset = offset + limit;
    const moreActivities = activities.slice(nextOffset, nextOffset + limit);

    if (moreActivities.length > 0) {
      setVisibleActivities((prevActivities) => [
        ...prevActivities,
        ...moreActivities,
      ]);
      setOffset(nextOffset);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - window.innerHeight / 2;

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

  if (loading) {
    return <div>Loading activities...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homepage">
      <h2 className="homepage-title">Kovebox - All about Korea!</h2>
      {visibleActivities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="card-container">
          {visibleActivities.map((activity, index) => (
            <div key={index} className="card">
              <h3 className="card-title">{activity.title}</h3>
              <p className="card-date">Date: {activity.date}</p>
              <p className="card-location">Location: {activity.location}</p>
              <a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                View Event
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
