import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventList from "./pages/User/EventList";
import EventDetail from "./pages/User/EventDetail";
import BookEvent from "./pages/User/BookEvent";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateEvent from "./pages/Organizer/CreateEvent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/book/:id" element={<BookEvent />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/organizer/create" element={<CreateEvent />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
