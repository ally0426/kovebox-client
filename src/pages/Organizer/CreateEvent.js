import React, { useState } from "react";
import { createEvent } from "../../services/organizerService";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent(eventData);
    // After successful submission, clear the form or show success message
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Event</h2>
      <input
        id="eventTitle"
        type="text"
        name="title"
        placeholder="Event Title"
        onChange={handleChange}
      />
      <input
        id="eventCategory"
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
      />
      <input type="date" name="date" onChange={handleChange} />
      <input type="time" name="time" onChange={handleChange} />
      <input
        id="eventLocation"
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
      />
      <input
        id="eventPrice"
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEvent;
