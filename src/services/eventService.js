import axios from "axios";

// Fetch events with pagination support
export const fetchScrapedEvents = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`/api/scrape?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scraped events:", error);
  }
};
