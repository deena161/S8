
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios for making API calls

// function StudentDashboard() {
//   const [ID, setID] = useState("");
//   const [studentData, setStudentData] = useState([]); // Store all student data
//   const [queryText, setQueryText] = useState(''); // State for the query input

//   useEffect(() => {
//     const student_ID = sessionStorage.getItem('Id');
//     setID(student_ID);
//     handle(student_ID);
//   }, []);

//   function handle(ID) {
//     axios.get(`http://localhost:6001/student-route?student_ID=${ID}`)
//       .then((res) => {
//         console.log("Student Result: ", res.data);
//         setStudentData(res.data); // Store the entire response
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   // Function to handle query submission
//   function submitQuery() {
//     if (!queryText) {
//       alert("Please enter a query.");
//       return;
//     }

//     const mentorId = studentData[0]?.Mentor_Id; // Get the mentor ID from student data

//     axios.post('http://localhost:6001/submit-query', {
//       studentId: ID,
//       mentorId: mentorId,
//       query: queryText
//     })
//     .then((res) => {
//       console.log("Query submitted successfully:", res.data);
//       setQueryText(''); // Clear the textarea after submission
//       handle(ID); // Optionally refresh the student data to show the new query
//     })
//     .catch((err) => {
//       console.error("Error submitting query:", err);
//     });
//   }

//   return (
//     <div>
//       {studentData.length > 0 ? (
//         <>
//           <h1>Student Id: {studentData[0].Std_Id}</h1>
//           <h1>Student Name: {studentData[0].Std_Name}</h1>
//           <h1>Student Email: {studentData[0].Std_Email}</h1>
//           <h1>Student Department: {studentData[0].Std_Department}</h1>
//           <h1>Student Mobile No: {studentData[0].Std_Mobile}</h1>
//           <h5>Student Profile: {studentData[0].Std_Profile_Url}</h5>
//           <h1>Mentor ID: {studentData[0].Mentor_Id}</h1>
//           <h1>Mentor Name: {studentData[0].Mentor_Name}</h1>
//           <h1>Mentor Email: {studentData[0].Mentor_Email}</h1>
//           <h1>Mentor Department: {studentData[0].Mentor_Department}</h1>
//           <h1>Mentor Mobile No: {studentData[0]. Mentor_Mobile}</h1>
//           {/* <h5>Mentor Mobile Profile: {studentData[0]. Mentor_Profile_Url}</h5> */}

//           <h2>Submit a Query:</h2>
//           <textarea
//             value={queryText}
//             onChange={(e) => setQueryText(e.target.value)}
//             rows="4"
//             cols="50"
//           />
//           <button onClick={submitQuery}>Submit Query</button>

//           <h2>Queries:</h2>
//           {studentData.map((item) => (
//             item.Query_Id ? (
//               <div key={item.Query_Id}>
//                 <h3>Query ID: {item.Query_Id}</h3>
//                 <p>Query: {item.Queries}</p>
//                 <p>Query Rising Time: {item.Query_CT}</p>

//                 <h4>Responses:</h4>
//                 {item.Response_Id ? (
//                   <div>
//                     <p>Response ID: {item.Response_Id}</p>
//                     <p>Response: {item.Response}</p>
//                     <p>Response Rising Time: {item.Response_CT}</p>
//                   </div>
//                 ) : (
//                   <p>No responses for this query.</p>
//                 )}
//               </div>
//             ) : null
//           ))}
//         </>
//       ) : (
//         <h1>No student data found.</h1>
//       )}
//     </div>
//   );
// }

// export default StudentDashboard;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../css/mentor.css'; // Reuse the same CSS files
// import '../css/mentorHelper.css'; // Reuse the same CSS files

// function StudentDashboard() {
//   const [sideBar1, setSideBar1] = useState(true); // For Student Details
//   const [sideBar2, setSideBar2] = useState(false); // For Mentor Details
//   const [sideBar3, setSideBar3] = useState(false); // For Queries & Responses

//   const [studentData, setStudentData] = useState([]); // Store student data
//   const [queryText, setQueryText] = useState(''); // State for query input

//   const [theme, setTheme] = useState('light'); // Manage theme (light/dark)
//   const [sidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility (responsive)
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     const student_ID = sessionStorage.getItem('Id');
//     fetchStudentData(student_ID);
//   }, []);

//   useEffect(() => {
//     const adjustSidebar = () => {
//       if (window.innerWidth <= 576) {
//         setSidebarVisible(false);
//       } else {
//         setSidebarVisible(true);
//       }
//     };

//     window.addEventListener('load', adjustSidebar);
//     window.addEventListener('resize', adjustSidebar);

//     return () => {
//       window.removeEventListener('load', adjustSidebar);
//       window.removeEventListener('resize', adjustSidebar);
//     };
//   }, []);

//   const fetchStudentData = (ID) => {
//     setLoading(true); // Set loading to true before fetching data
//     axios.get(`http://localhost:6001/student-route?student_ID=${ID}`)
//       .then((res) => {
//         console.log("Student Result: ", res.data);
//         setStudentData(res.data); // Store the entire response
//       })
//       .catch((err) => {
//         console.error("Error fetching student data:", err);
//       })
//       .finally(() => {
//         setLoading(false); // Set loading to false after fetching data
//       });
//   };

//   const submitQuery = () => {
//     if (!queryText) {
//       alert("Please enter a query.");
//       return;
//     }

//     const mentorId = studentData[0]?.Mentor_Id; // Get the mentor ID from student data

//     axios.post('http://localhost:6001/submit-query', {
//       studentId: sessionStorage.getItem('Id'),
//       mentorId: mentorId,
//       query: queryText
//     })
//       .then((res) => {
//         console.log("Query submitted successfully:", res.data);
//         setQueryText(''); // Clear the textarea after submission
//         fetchStudentData(sessionStorage.getItem('Id')); // Refresh the data
//       })
//       .catch((err) => {
//         console.error("Error submitting query:", err);
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading message while data is being fetched
//   }

//   // Check if student data is available
//   const student = studentData[0];

//   // Navigation functions
//   const nav1 = () => {
//     setSideBar1(true);
//     setSideBar2(false);
//     setSideBar3(false);
//   };

//   const nav2 = () => {
//     setSideBar1(false);
//     setSideBar2(true);
//     setSideBar3(false);
//   };

//   const nav3 = () => {
//     setSideBar1(false);
//     setSideBar2(false);
//     setSideBar3(true);
//   };

//   // Theme toggle function
//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//     console.log("Theme Changed");
//   };

//   // Function to convert UTC to IST
//   function convertToIST(utcTimestamp) {
//     const date = new Date(utcTimestamp);
//     const options = {
//       hour12: true,
//       timeZone: 'Asia/Kolkata',
//       weekday: 'short',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     };
//     return date.toLocaleString('en-IN', options);
//   }

//   return (
//     <div className={theme}>
//       <section id="sidebar" className={sidebarVisible ? '' : 'hide'}>
//         <a href="#" className="brand">
//           <i className='bx bxs-smile bx-lg'></i>
//           <span className="text">Student</span>
//         </a>
//         <ul className="side-menu top">
//           <li className={sideBar1 ? 'active' : ''}>
//             <a href="#" onClick={nav1}>
//               <i className='bx bxs-dashboard bx-sm bx-spin-hover'></i>
//               <span className="text">Dashboard</span>
//             </a>
//           </li>
//           <li className={sideBar2 ? 'active' : ''}>
//             <a href="#scrollhelper" onClick={nav2}>
//               <i className='bx bxs-message-dots bx-sm bx-tada-hover'></i>
//               <span className="text">Queries & Response</span>
//             </a>
//           </li>
//           <li className={sideBar3 ? 'active' : ''}>
//             <a href="#" onClick={nav3} id='queryscroll'>
//               <i className="fa-solid fa-people-group bx-flashing-hover"></i>
//               <span className="text">Team</span>
//             </a>
//           </li>
//         </ul>
//         <ul className="side-menu bottom">
//           <li>
//             <a href="#" className="logout">
//               <i className='bx bx-power-off bx-sm bx-burst-hover'></i>
//               <span className="text">Logout</span>
//             </a>
//           </li>
//         </ul>
//       </section>

//       <section id="content">
//         <nav>
//           <div className="nav-left">
//             <i className='bx bx-menu bx-sm' id='menu' onClick={() => setSidebarVisible(!sidebarVisible)}></i>
//             <span>Categories</span>
//           </div>

//           <div className="nav-right">
//             <input type="checkbox" className="checkbox" id="switch-mode" hidden checked={theme === 'dark'} onChange={toggleTheme} />
//             <label className="switch-mode" htmlFor="switch-mode">
//               <i className="bx bxs-moon"></i>
//               <i className="bx bx-sun"></i>
//               <div className="ball"></div>
//             </label>
//             <a href="#" className="profile">
//               {student && <img src={student.Std_Profile_Url} alt="Profile" />} {/* Check if student exists */}
//             </a>
//           </div>
//         </nav>



//         {sideBar1 && student && ( // Check if student exists before rendering
//           <main>
//             <div className="details-container">
//               {/* Student Details Box */}
//               <div className="student-box">
//                 <h1>Student Detail</h1>
//                 <p><strong>ID:</strong> {student.Std_Id}</p>
//                 <p><strong>Name:</strong> {student.Std_Name}</p>
//                 <p><strong>Email:</strong> {student.Std_Email}</p>
//                 <p><strong>Department:</strong> {student.Std_Department}</p>
//                 <p><strong>Mobile No:</strong> {student.Std_Mobile}</p>
//               </div>

//               {/* Mentor Details Box */}
//               <div className="mentor-box">
//                 <h2>Mentor Details</h2>
//                 <p><strong>Mentor ID:</strong> {student.Mentor_Id}</p>
//                 <p><strong>Mentor Name:</strong> {student.Mentor_Name}</p>
//                 <p><strong>Mentor Email:</strong> {student.Mentor_Email}</p>
//                 <p><strong>Mentor Department:</strong> {student.Mentor_Department}</p>
//                 <p><strong>Mentor Mobile No:</strong> {student.Mentor_Mobile}</p>
//               </div>
//             </div>

//           </main>
//         )}


//         {sideBar2 && (
//           <main className="chat-container">
//             <div className="chat-box student-chat-box">
//               {studentData.map((item) => (
//                 item.Query_Id ? (
//                   <div key={item.Query_Id} className="chat-message">
//                     <div className="student-query-bubble query-bubble">
//                       <h4>Query ID: {item.Query_Id}</h4>
//                       <p>{item.Queries}</p>
//                       <span className="timestamp student-timestamp">{convertToIST(item.Query_CT)}</span>
//                     </div>

//                     {item.Response_Id ? (
//                       <div className="student-response-bubble response-bubble">
//                         <h4>Mentor Response</h4>
//                         <p>{item.Response}</p>
//                         <span className="timestamp student-timestamp">{convertToIST(item.Response_CT)}</span>
//                       </div>
//                     ) : (
//                       <div className="no-response student-no-response">No responses yet.</div>
//                     )}
//                   </div>
//                 ) : null
//               ))}
//             </div>
//             <div id='scrollhelper'></div>
//             {/* Fixed Bottom Form */}
//             <form onSubmit={(e) => { e.preventDefault(); submitQuery(); }} className="response-form">
//               <textarea
//                 className="response-textarea"
//                 placeholder="Type your query..."
//                 value={queryText}
//                 onChange={(e) => setQueryText(e.target.value)}
//                 required
//               />
//               <button type="submit" className="send-button">Submit Query</button>
//             </form>
//           </main>
//         )}



//         {sideBar3 && student && ( // Check if student exists before rendering
//           <main className="mentor-details-container">

//           </main>
//         )}



//       </section>
//     </div>
//   );
// }

// export default StudentDashboard;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/mentor.css'; // Reuse the same CSS files
import '../css/mentorHelper.css'; // Reuse the same CSS files

function StudentDashboard() {
  const [sideBar1, setSideBar1] = useState(true); // For Student Details
  const [sideBar2, setSideBar2] = useState(false); // For Mentor Details
  const [sideBar3, setSideBar3] = useState(false); // For Queries & Responses
  const [totalQueries, setTotalQueries] = useState(0);
  const [resolvedQueries, setResolvedQueries] = useState(0);
  const [unresolvedQueries, setUnresolvedQueries] = useState(0);

  const [studentData, setStudentData] = useState([]); // Store student data
  const [queryText, setQueryText] = useState(''); // State for query input

  const [theme, setTheme] = useState('light'); // Manage theme (light/dark)
  const [sidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility (responsive)
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const student_ID = sessionStorage.getItem('Id');
    fetchStudentData(student_ID);
  }, []);

  useEffect(() => {
    const adjustSidebar = () => {
      if (window.innerWidth <= 576) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    };

    window.addEventListener('load', adjustSidebar);
    window.addEventListener('resize', adjustSidebar);

    return () => {
      window.removeEventListener('load', adjustSidebar);
      window.removeEventListener('resize', adjustSidebar);
    };
  }, []);

  const fetchStudentData = (ID) => {
    setLoading(true); // Set loading to true before fetching data
    axios.get(`http://localhost:6001/student-route?student_ID=${ID}`)
      .then((res) => {
        console.log("Student Result: ", res.data);
        setStudentData(res.data); // Store the entire response

        // Extract counts from the first row of the response
        if (res.data.length > 0) {
          setTotalQueries(res.data[0].total_queries || 0);
          setResolvedQueries(res.data[0].resolved_queries || 0);
          setUnresolvedQueries(res.data[0].unresolved_queries || 0);
        }
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  };

  const submitQuery = () => {
    if (!queryText) {
      alert("Please enter a query.");
      return;
    }

    const mentorId = studentData[0]?.Mentor_Id; // Get the mentor ID from student data

    axios.post('http://localhost:6001/submit-query', {
      studentId: sessionStorage.getItem('Id'),
      mentorId: mentorId,
      query: queryText
    })
      .then((res) => {
        console.log("Query submitted successfully:", res.data);
        setQueryText(''); // Clear the textarea after submission
        fetchStudentData(sessionStorage.getItem('Id')); // Refresh the data
      })
      .catch((err) => {
        console.error("Error submitting query:", err);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  // Check if student data is available
  const student = studentData[0];

  // Navigation functions
  const nav1 = () => {
    setSideBar1(true);
    setSideBar2(false);
    setSideBar3(false);
  };

  const nav2 = () => {
    setSideBar1(false);
    setSideBar2(true);
    setSideBar3(false);
  };

  const nav3 = () => {
    setSideBar1(false);
    setSideBar2(false);
    setSideBar3(true);
  };

  // Theme toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    console.log("Theme Changed");
  };

  // Function to convert UTC to IST
  function convertToIST(utcTimestamp) {
    const date = new Date(utcTimestamp);
    const options = {
      hour12: true,
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return date.toLocaleString('en-IN', options);
  }

  return (
    <div className={theme}>
      <section id="sidebar" className={sidebarVisible ? '' : 'hide'}>
        <a href="#" className="brand">
          <i className='bx bxs-smile bx-lg'></i>
          <span className="text">Student</span>
        </a>
        <ul className="side-menu top">
          <li className={sideBar1 ? 'active' : ''}>
            <a href="#" onClick={nav1}>
              <i className='bx bxs-dashboard bx-sm bx-spin-hover'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li className={sideBar2 ? 'active' : ''}>
            <a href="#scrollhelper" onClick={nav2}>
              <i className='bx bxs-message-dots bx-sm bx-tada-hover'></i>
              <span className="text">Queries & Response</span>
            </a>
          </li>
          <li className={sideBar3 ? 'active' : ''}>
            <a href="#" onClick={nav3} id='queryscroll'>
              <i className="fa-solid fa-people-group bx-flashing-hover"></i>
              <span className="text">Team</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu bottom">
          <li>
            <a href="#" className="logout">
              <i className='bx bx-power-off bx-sm bx-burst-hover'></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <div className="nav-left">
            <i className='bx bx-menu bx-sm' id='menu' onClick={() => setSidebarVisible(!sidebarVisible)}></i>
            <span>Categories</span>
          </div>

          <div className="nav-right">
            <input type="checkbox" className="checkbox" id="switch-mode" hidden checked={theme === 'dark'} onChange={toggleTheme} />
            <label className="switch-mode" htmlFor="switch-mode">
              <i className="bx bxs-moon"></i>
              <i className="bx bx-sun"></i>
              <div className="ball"></div>
            </label>
            <a href="#" className="profile">
              {student && <img src={student.Std_Profile_Url} alt="Profile" />} {/* Check if student exists */}
            </a>
          </div>
        </nav>



        {sideBar1 && student && ( // Check if student exists before rendering
          <main>
            <div className="details-container">
              {/* Student Details Box */}
              <div className="student-box">
                <h1>Student Details</h1>
                <p><strong>ID:</strong> {student.Std_Id}</p>
                <p><strong>Name:</strong> {student.Std_Name}</p>
                <p><strong>Email:</strong> {student.Std_Email}</p>
                <p><strong>Department:</strong> {student.Std_Department}</p>
                <p><strong>Mobile No:</strong> {student.Std_Mobile}</p>
              </div>

              {/* Mentor Details Box */}
              <div className="mentor-box">
                <h2>Mentor Details</h2>
                <p><strong>Mentor ID:</strong> {student.Mentor_Id}</p>
                <p><strong>Mentor Name:</strong> {student.Mentor_Name}</p>
                <p><strong>Mentor Email:</strong> {student.Mentor_Email}</p>
                <p><strong>Mentor Department:</strong> {student.Mentor_Department}</p>
                <p><strong>Mentor Mobile No:</strong> {student.Mentor_Mobile}</p>
              </div>

              {/* Query Statistics Box */}

                {/* <div className='result'><p><strong>Total Queries Raised:</strong> {totalQueries}</p></div>
                <div className='result'><p><strong>Total Responses:</strong> {resolvedQueries}</p></div>
                <div className='result'><p><strong>Resolved Queries:</strong> {totalQueries-unresolvedQueries}</p></div>
                <div className='result'><p><strong>Unresolved Queries:</strong> {unresolvedQueries}</p></div> */}

<div className="result text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
  <p><strong>Total Queries Raised:</strong> {totalQueries}</p>
</div>
<div className="result text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
  <p><strong>Total Responses:</strong> {resolvedQueries}</p>
</div>
<div className="result text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
  <p><strong>Resolved Queries:</strong> {totalQueries - unresolvedQueries}</p>
</div>
<div className="result text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
  <p><strong>Unresolved Queries:</strong> {unresolvedQueries}</p>
</div>

           

            </div>
          </main>
        )}


        {sideBar2 && (
          <main className="chat-container">
            <div className="chat-box student-chat-box">
              {studentData.map((item) => (
                item.Query_Id ? (
                  <div key={item.Query_Id} className="chat-message">
                    <div className="student-query-bubble query-bubble">
                      <h4>Query ID: {item.Query_Id}</h4>
                      <p>{item.Queries}</p>
                      <span className="timestamp student-timestamp">{convertToIST(item.Query_CT)}</span>
                    </div>

                    {item.Response_Id ? (
                      <div className="student-response-bubble response-bubble">
                        <h4>Mentor Response</h4>
                        <p>{item.Response}</p>
                        <span className="timestamp student-timestamp">{convertToIST(item.Response_CT)}</span>
                      </div>
                    ) : (
                      <div className="no-response student-no-response">No responses yet.</div>
                    )}
                  </div>
                ) : null
              ))}
            </div>
            <div id='scrollhelper'></div>
            {/* Fixed Bottom Form */}
            <form onSubmit={(e) => { e.preventDefault(); submitQuery(); }} className="response-form">
              <textarea
                className="response-textarea"
                placeholder="Type your query..."
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                required
              />
              <button type="submit" className="send-button">Submit Query</button>
            </form>
          </main>
        )}



        {sideBar3 && student && ( // Check if student exists before rendering
          <main className="mentor-details-container">

          </main>
        )}



      </section>
    </div>
  );
}

export default StudentDashboard;





