// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Register1 from './component/Register1'; 
// import Login1 from './component/Login1';
// import StudentDashboard from './pages/StudentDashboard';
// import InstructorDashboard from './pages/InstructorDashboard';
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 {/* Public Routes */}
//                 <Route path="/register" element={<Register1 />} />
//                 <Route path="/login" element={<Login1 />} />

//                 {/* Role-based Dashboards */}
//                 <Route path="/student/dashboard" element={<StudentDashboard />} />
//                 <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
//                 <Route path="/admin/dashboard" element={<AdminDashboard />} />

//                 {/* Default Redirect */}
//                 <Route path="/" element={<Navigate to="/register" replace />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;
// // import React from 'react'
// // import StudentDashboard from './pages/StudentDashboard'

// // function App() {
// //   return (
// //     <div>
// //       <StudentDashboard/>
// //     </div>
// //   )
// // }

// // export default App

// import React from 'react'
// import CourseList from './component/courses/CourseList'

// function App() {
//   return (
//     <div>
//       <CourseList/>
//     </div>
//   )
// }

// export default App

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register1 from "./component/Register1";
import Login1 from "./component/Login1";

import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Instructor feature components
import CourseList from "./component/courses/CourseList";
import CourseStatus from "./component/courses/CourseStatus";
import Announcements from "./component/courses/Announcements";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* -------- Public -------- */}
        <Route path="/register" element={<Register1 />} />
        <Route path="/login" element={<Login1 />} />

        {/* -------- Student -------- */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* -------- Instructor -------- */}
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/courses" element={<CourseList />} />
        <Route path="/instructor/status" element={<CourseStatus />} />
        <Route path="/instructor/announce" element={<Announcements />} />

        {/* -------- Admin -------- */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* -------- Default -------- */}
        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
