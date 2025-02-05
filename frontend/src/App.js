
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import StudentDashboard from './components/StudentDashboard';
// import MentorDashboard from './components/MentorDashboard';
// import SuperMentorDashboard from './components/SuperMentorDashboard';
// import DomainInchargeDashboard from './components/DomainInchargeDashboard';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//         <Route path="/mentor-dashboard" element={<MentorDashboard />} />
//         <Route path="/super-mentor-dashboard" element={<SuperMentorDashboard />} />
//         <Route path="/admin-dashboard" element={<DomainInchargeDashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/mentor" element={<MentorDashboard />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;

