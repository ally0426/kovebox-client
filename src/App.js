// 1.

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import EventList from "./pages/User/EventList";
import EventDetail from "./pages/User/EventDetail";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/events" element={<EventList />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// 2.
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AuthCallback from "./pages/AuthCallback";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/auth/google/callback" element={<AuthCallback />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// 3.
// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import CreateEvent from "./pages/Organizer/CreateEvent";
// import EventList from "./pages/User/EventList";
// import BookEvent from "./pages/User/BookEvent";
// // import NotFound from './pages/NotFound';
// import "./global.css";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/organizer/create" element={<CreateEvent />} />
//           <Route path="/events" element={<EventList />} />
//           <Route path="/book/:id" element={<BookEvent />} />
//           {/* <Route path="*" element={<NotFound />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
