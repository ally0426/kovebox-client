import axios from "axios";

const API_URL = "/api/organizer";

// Create a new event
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
  }
};

// Fetch events created by the organizer
export const getOrganizerEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizer events:", error);
  }
};

// Update an event
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
  }
};
