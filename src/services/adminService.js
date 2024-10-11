import axios from "axios";

const API_URL = "/api/admin";

// Fetch pending events for admin approval
export const fetchPendingEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending events:", error);
  }
};

// Approve an event
export const approveEvent = async (eventId) => {
  try {
    const response = await axios.put(`${API_URL}/events/approve/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving event:", error);
  }
};

// Reject an event
export const rejectEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/events/reject/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting event:", error);
  }
};
