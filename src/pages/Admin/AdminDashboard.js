import React, { useState, useEffect } from "react";
import { fetchPendingEvents, approveEvent } from "../../services/adminService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    fetchPendingEvents().then(setPendingEvents);
  }, []);

  const handleApprove = async (eventId) => {
    await approveEvent(eventId);
    setPendingEvents(pendingEvents.filter((event) => event._id !== eventId));
  };

  return (
    <div>
      <h2>Admin Dashboard - Approve Events</h2>
      {pendingEvents.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <button onClick={() => handleApprove(event._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
