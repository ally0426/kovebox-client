import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookEvent.css";

const BookEvent = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/user/book", { name, email, phone, eventId: id });
      alert("Booking successful!");
    } catch (error) {
      console.error("Error booking event:", error);
      alert("Booking failed.");
    }
  };

  return (
    <div>
      <h2>Book Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookEvent;
