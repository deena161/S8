// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function MentorDashboard() {
//   const [mentorData, setMentorData] = useState({ mentor: [], queries: [] });
//   const [queryId, setQueryId] = useState(''); // State for Query ID input
//   const [responseText, setResponseText] = useState(''); // State for Response input

//   useEffect(() => {
//     const MID = sessionStorage.getItem('Id');
//     handle(MID);
//   }, []);

//   function handle(ID) {
//     axios.get(`http://localhost:6001/mentor-route?mentor_ID=${ID}`)
//       .then((res) => {
//         console.log("Mentor Result: ", res.data);
//         setMentorData(res.data); // Store the entire response
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   const handleResponseSubmit = (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     // Prepare the data to send to the backend
//     const data = {
//       queryId: queryId,
//       response: responseText,
//     };

//     // Make a POST request to submit the response
//     axios.post('http://localhost:6001/submit-response', data)
//       .then((res) => {
//         console.log("Response submitted successfully:", res.data);
//         // Optionally, you can refresh the queries or show a success message
//         handle(localStorage.getItem('Id')); // Refresh the data
//         // Clear the input fields
//         setQueryId('');
//         setResponseText('');
//       })
//       .catch((err) => {
//         console.error("Error submitting response:", err);
//       });
//   };

//   if (mentorData.mentor.length === 0) {
//     return <div>Loading...</div>; // You can also show a loading spinner or message
//   }

//   return (
//     <div>
//       {/* Display Mentor Details */}
//       <h1>ID: {mentorData.mentor[0].Mentor_Id}</h1>
//       <h1>Name: {mentorData.mentor[0].Mentor_Name}</h1>
//       <h1>Email: {mentorData.mentor[0].Mentor_Email}</h1>
//       <h1>Department: {mentorData.mentor[0].Mentor_Department}</h1>
//       <h1>Mobile No: {mentorData.mentor[0].Mentor_Mobile}</h1>
//       <h5>Profile: {mentorData.mentor[0].Mentor_Profile_Url}</h5>
//       <img src={mentorData.mentor[0].Mentor_Profile_Url} style={{borderRadius: "50%"}}></img>

//       <h2>Submit Response</h2>
//       <form onSubmit={handleResponseSubmit}>
//         <label>Query ID: </label>
//         <input 
//           type='text' 
//           value={queryId} 
//           onChange={(e) => setQueryId(e.target.value)} 
//           required 
//         />
//         <br />
//         <label>Response: </label>
//         <textarea 
//           rows="4" 
//           cols="50" 
//           value={responseText} 
//           onChange={(e) => setResponseText(e.target.value)} 
//           required 
//         />
//         <br />
//         <input type='submit' value='Submit Response' />
//       </form>

//       <h2>Student Details</h2>
//       {/* Display Student Details */}
//       {mentorData.mentor.map((item) => (
//         item.Std_Id ? (
//           <div key={item.Std_Id}>
//             <h3>Student ID: {item.Std_Id}</h3>
//             <p>Student Name: {item.Std_Name}</p>
//             <p>Student Email: {item.Std_Email}</p>
//             <p>Student Department: {item.Std_Department}</p>
//             <p>Student Mobile No: {item.Std_Mobile}</p>
//             {/* <p>Student Profile: {item.Std_Profile_Url}</p> */}
//           </div>
//         ) : null
//       ))}

//       <h2>Queries and Responses</h2>
//       {/* Display Queries and Responses for each student */}
//       {mentorData.queries.map((item) => (
//         item.Query_Id ? (
//           <div key={item.Query_Id}>
//             <h3>Student ID: {item.Std_Id}</h3>
//             <h3>Student Name: {item.Std_Name}</h3>
//             <h3>Query ID: {item.Query_Id}</h3>
//             <p>Query: {item.Queries}</p>
//             <p>Query Rising Time: {item.Query_CT}</p>

//             <h4>Responses:</h4>
//             {item.Response_Id ? (
//               <div>
//                 <p>Response ID: {item.Response_Id}</p>
//                 <p>Response: {item.Response}</p>
//                 <p>Response Rising Time: {item.Response_CT}</p>
//               </div>
//             ) : (
//               <p>No responses for this query.</p>
//             )}
//           </div>
//         ) : null
//       ))}
//     </div>
//    );
// }

// export default MentorDashboard; 
















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../css/mentor.css';
// import '../css/mentorHelper.css';

// function MentorDashboard() {
//   const [sideBar1, setSideBar1] = useState(true);
//   const [sideBar2, setSideBar2] = useState(false);
//   const [sideBar3, setSideBar3] = useState(false);

//   const [mentorData, setMentorData] = useState({ mentor: [], queries: [] });
//   const [queryId, setQueryId] = useState(''); // State for Query ID input
//   const [responseText, setResponseText] = useState(''); // State for Response input

//   const [theme, setTheme] = useState('light'); // Manage theme (light/dark)
//   const [sidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility (responsive)
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     const MID = sessionStorage.getItem('Id');
//     fetchMentorData(MID);
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

//   const fetchMentorData = (ID) => {
//     setLoading(true); // Set loading to true before fetching data
//     axios.get(`http://localhost:6001/mentor-route?mentor_ID=${ID}`)
//       .then((res) => {
//         console.log("Mentor Result: ", res.data);
//         setMentorData(res.data); // Store the entire response
//       })
//       .catch((err) => {
//         console.error("Error fetching mentor data:", err);
//       })
//       .finally(() => {
//         setLoading(false); // Set loading to false after fetching data
//       });
//   };

//   const handleResponseSubmit = (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     // Prepare the data to send to the backend
//     const data = {
//       queryId: queryId,
//       response: responseText,
//     };

//     // Make a POST request to submit the response
//     axios.post('http://localhost:6001/submit-response', data)
//       .then((res) => {
//         console.log("Response submitted successfully:", res.data);
//         // Refresh the mentor data after submitting the response
//         const MID = sessionStorage.getItem('Id');
//         fetchMentorData(MID); // Fetch mentor data again
//         // Clear the input fields
//         setQueryId('');
//         setResponseText('');
//       })
//       .catch((err) => {
//         console.error("Error submitting response:", err);
//       });
      
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading message while data is being fetched
//   }

//   // Check if mentor data is available
//   const mentor = mentorData.mentor[0];

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
//           <span className="text">Mentor</span>
//         </a>
//         <ul className="side-menu top">
//           <li className={sideBar1 ? 'active' : ''}>
//             <a href="#" onClick={nav1}>
//               <i className='bx bxs-dashboard bx-sm'></i>
//               <span className="text">Dashboard</span>
//             </a>
//           </li>
//           <li className={sideBar2 ? 'active' : ''}>
//             <a href="#" onClick={nav2}>
//               <i className="fa-solid fa-people-group"></i>
//               <span className="text">Students</span>
//             </a>
//           </li>
//           <li className={sideBar3 ? 'active' : ''}>
//             <a href="#scrollhelper" onClick={nav3} id='queryscroll'> 
//               <i className='bx bxs-message-dots bx-sm'></i>
//               <span className="text">Queries & Response</span>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <i className='bx bxs-doughnut-chart bx-sm'></i>
//               <span className="text">Message</span>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <i className='bx bxs-group bx-sm'></i>
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
//               {mentor && <img src={mentor.Mentor_Profile_Url} alt="Profile" />} {/* Check if mentor exists */}
//             </a>
//           </div>
//         </nav>

//         {sideBar1 && mentor && ( // Check if mentor exists before rendering
//           <main>
//             <h1>ID: {mentor.Mentor_Id}</h1>
//             <h1>Name: {mentor.Mentor_Name}</h1>
//             <h1>Email: {mentor.Mentor_Email}</h1>
//             <h1>Department: {mentor.Mentor_Department}</h1>
//             <h1>Mobile No: {mentor.Mentor_Mobile}</h1>
//             <h5>Profile: {mentor.Mentor_Profile_Url}</h5>
//             <img src={mentor.Mentor_Profile_Url} style={{ borderRadius: "50%" }} />
//           </main>
//         )}

//         {sideBar2 && (
//           <main className="student-details-container">
//             <h2 className="student-details-title">Student Details</h2>
//             {mentorData.mentor.map((item) => (
//               item.Std_Id ? (
//                 <div key={item.Std_Id} className="student-card">
//                   <h3 className="student-id">Student ID: {item.Std_Id}</h3>
//                   <p className="student-name">Student Name: {item.Std_Name}</p>
//                   <p className="student-email">Student Email: {item.Std_Email}</p>
//                   <p className="student-department">Student Department: {item.Std_Department}</p>
//                   <p className="student-mobile">Student Mobile No: {item.Std_Mobile}</p>
//                 </div>
//               ) : null
//             ))}
//           </main>
//         )}

//         {sideBar3 && (
//           <main className="chat-container">
//             <div className="chat-box">
//               {[...mentorData.queries].reverse().map((item) => (
//                 item.Query_Id ? (
//                   <div key={item.Query_Id} className="chat-message">
//                     <div className="query-bubble">
//                       <h4>{item.Std_Name} (ID: {item.Std_Id})</h4>
//                       <p>{item.Queries}</p>
//                       <div className='group'>
//                         <span className='queryid'>Query ID: {item.Query_Id}</span>
//                         <span className="timestamp">{convertToIST(item.Query_CT)}</span>
//                       </div>
//                     </div>

//                     {item.Response_Id ? (
//                       <div className="response-bubble">
//                         <h4>Mentor Response</h4>
//                         <p>{item.Response}</p>
//                         <span className="timestamp">{convertToIST(item.Response_CT)}</span>
//                       </div>
//                     ) : (
//                       <div className="no-response">No responses yet.</div>
//                     )}
//                   </div>
//                 ) : null
//               ))}
//             </div>
//             <div id='scrollhelper'></div>
//             {/* Fixed Bottom Form */}
//             <form onSubmit={handleResponseSubmit} className="response-form">
//               <input
//                 type="text"
//                 className="query-id-input"
//                 placeholder="Query ID"
//                 value={queryId}
//                 onChange={(e) => setQueryId(e.target.value)}
//                 required
//               />
//               <textarea
//                 className="response-textarea"
//                 placeholder="Type your response..."
//                 value={responseText}
//                 onChange={(e) => setResponseText(e.target.value)}
//                 required
//               />
//               <button type="submit" className="send-button" >Send</button> 
//             </form>
//           </main>
//         )}
//       </section>
//     </div>
//   );




// }

// export default MentorDashboard;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/mentor.css';
import '../css/mentorHelper.css';

function MentorDashboard() {
  const [sideBar1, setSideBar1] = useState(true);
  const [sideBar2, setSideBar2] = useState(false);
  const [sideBar3, setSideBar3] = useState(false);

  const [mentorData, setMentorData] = useState({ mentor: [], queries: [] });
  const [queryId, setQueryId] = useState(''); // State for Query ID input
  const [responseText, setResponseText] = useState(''); // State for Response input

  const [theme, setTheme] = useState('light'); // Manage theme (light/dark)
  const [sidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility (responsive)
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const MID = sessionStorage.getItem('Id');
    fetchMentorData(MID);
  },[]);

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

  const fetchMentorData = (ID) => {
    setLoading(true); // Set loading to true before fetching data
    axios.get(`http://localhost:6001/mentor-route?mentor_ID=${ID}`)
      .then((res) => {
        console.log("Mentor Result: ", res.data);
        setMentorData(res.data); // Store the entire response
      })
      .catch((err) => {
        console.error("Error fetching mentor data:", err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  };

  const handleResponseSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Prepare the data to send to the backend
    const data = {
      queryId: queryId,
      response: responseText,
    };

    // Make a POST request to submit the response
    axios.post('http://localhost:6001/submit-response', data)
      .then((res) => {
        console.log("Response submitted successfully:", res.data);

        // Update the local state with the new response
        const updatedQueries = mentorData.queries.map(query => {
          if (query.Query_Id === parseInt(queryId)) {
            return {
              ...query,
              Response_Id: res.data.responseId, // Assuming the backend returns the new response ID
              Response: responseText,
              Response_CT: new Date().toISOString() // Assuming the backend returns the timestamp
            };
          }
          return query;
        });

        setMentorData(prevState => ({
          ...prevState,
          queries: updatedQueries
        }));

        // Clear the input fields
        setQueryId('');
        setResponseText('');
      })
      .catch((err) => {
        console.error("Error submitting response:", err);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  // Check if mentor data is available
  const mentor = mentorData.mentor[0];

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
          <span className="text">Mentor</span>
        </a>
        <ul className="side-menu top">
          <li className={sideBar1 ? 'active' : ''}>
            <a href="#" onClick={nav1}>
              <i className='bx bxs-dashboard bx-sm'></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li className={sideBar2 ? 'active' : ''}>
            <a href="#" onClick={nav2}>
              <i className="fa-solid fa-people-group"></i>
              <span className="text">Students</span>
            </a>
          </li>
          <li className={sideBar3 ? 'active' : ''}>
            <a href="#scrollhelper" onClick={nav3} id='queryscroll'> 
              <i className='bx bxs-message-dots bx-sm'></i>
              <span className="text">Queries & Response</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bxs-doughnut-chart bx-sm'></i>
              <span className="text">Message</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className='bx bxs-group bx-sm'></i>
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
              {mentor && <img src={mentor.Mentor_Profile_Url} alt="Profile" />} {/* Check if mentor exists */}
            </a>
          </div>
        </nav>

        {sideBar1 && mentor && ( // Check if mentor exists before rendering
          <main>
            <h1>ID: {mentor.Mentor_Id}</h1>
            <h1>Name: {mentor.Mentor_Name}</h1>
            <h1>Email: {mentor.Mentor_Email}</h1>
            <h1>Department: {mentor.Mentor_Department}</h1>
            <h1>Mobile No: {mentor.Mentor_Mobile}</h1>
            <h5>Profile: {mentor.Mentor_Profile_Url}</h5>
            <img src={mentor.Mentor_Profile_Url} style={{ borderRadius: "50%" }} />
          </main>
        )}

        {sideBar2 && (
          <main className="student-details-container">
            <h2 className="student-details-title">Student Details</h2>
            {mentorData.mentor.map((item) => (
              item.Std_Id ? (
                <div key={item.Std_Id} className="student-card">
                  <h3 className="student-id">Student ID: {item.Std_Id}</h3>
                  <p className="student-name">Student Name: {item.Std_Name}</p>
                  <p className="student-email">Student Email: {item.Std_Email}</p>
                  <p className="student-department">Student Department: {item.Std_Department}</p>
                  <p className="student-mobile">Student Mobile No: {item.Std_Mobile}</p>
                </div>
              ) : null
            ))}
          </main>
        )}

        {sideBar3 && (
          <main className="chat-container">
            <div className="chat-box">  
              {[...mentorData.queries].reverse().map((item) => (
                item.Query_Id ? (
                  <div key={item.Query_Id} className="chat-message">
                    <div className="query-bubble">
                      <h4>{item.Std_Name} (ID: {item.Std_Id})</h4>
                      <p>{item.Queries}</p>
                      <div className='group'>
                        <span className='queryid'>Query ID: {item.Query_Id}</span>
                        <span className="timestamp">{convertToIST(item.Query_CT)}</span>
                      </div>
                    </div>

                    {item.Response_Id ? (
                      <div className="response-bubble">
                        <h4>Mentor Response</h4>
                        <p>{item.Response}</p>
                        <span className="timestamp">{convertToIST(item.Response_CT)}</span>
                      </div>
                    ) : (
                      <div className="no-response">No responses yet.</div>
                    )}
                  </div>
                ) : null
              ))}
            </div>
            <div id='scrollhelper'></div>
            {/* Fixed Bottom Form */}
            <form onSubmit={handleResponseSubmit} className="response-form">
              <input
                type="text"
                className="query-id-input"
                placeholder="Query ID"
                value={queryId}
                onChange={(e) => setQueryId(e.target.value)}
                required
              />
              <textarea
                className="response-textarea"
                placeholder="Type your response..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                required
              />
              <button type="submit" className="send-button" >Send</button> 
            </form>
          </main>
        )}
      </section>
    </div>
  );
}

export default MentorDashboard;







