
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls

function StudentDashboard() {
  const [ID, setID] = useState("");
  const [studentData, setStudentData] = useState([]); // Store all student data
  const [queryText, setQueryText] = useState(''); // State for the query input

  useEffect(() => {
    const student_ID = sessionStorage.getItem('Id');
    setID(student_ID);
    handle(student_ID);
  }, []);

  function handle(ID) {
    axios.get(`http://localhost:6001/student-route?student_ID=${ID}`)
      .then((res) => {
        console.log("Student Result: ", res.data);
        setStudentData(res.data); // Store the entire response
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Function to handle query submission
  function submitQuery() {
    if (!queryText) {
      alert("Please enter a query.");
      return;
    }

    const mentorId = studentData[0]?.Mentor_Id; // Get the mentor ID from student data

    axios.post('http://localhost:6001/submit-query', {
      studentId: ID,
      mentorId: mentorId,
      query: queryText
    })
    .then((res) => {
      console.log("Query submitted successfully:", res.data);
      setQueryText(''); // Clear the textarea after submission
      handle(ID); // Optionally refresh the student data to show the new query
    })
    .catch((err) => {
      console.error("Error submitting query:", err);
    });
  }

  return (
    <div>
      {studentData.length > 0 ? (
        <>
          <h1>Student Id: {studentData[0].Std_Id}</h1>
          <h1>Student Name: {studentData[0].Std_Name}</h1>
          <h1>Student Email: {studentData[0].Std_Email}</h1>
          <h1>Student Department: {studentData[0].Std_Department}</h1>
          <h1>Student Mobile No: {studentData[0].Std_Mobile}</h1>
          <h5>Student Profile: {studentData[0].Std_Profile_Url}</h5>
          <h1>Mentor ID: {studentData[0].Mentor_Id}</h1>
          <h1>Mentor Name: {studentData[0].Mentor_Name}</h1>
          <h1>Mentor Email: {studentData[0].Mentor_Email}</h1>
          <h1>Mentor Department: {studentData[0].Mentor_Department}</h1>
          <h1>Mentor Mobile No: {studentData[0]. Mentor_Mobile}</h1>
          {/* <h5>Mentor Mobile Profile: {studentData[0]. Mentor_Profile_Url}</h5> */}

          <h2>Submit a Query:</h2>
          <textarea
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            rows="4"
            cols="50"
          />
          <button onClick={submitQuery}>Submit Query</button>

          <h2>Queries:</h2>
          {studentData.map((item) => (
            item.Query_Id ? (
              <div key={item.Query_Id}>
                <h3>Query ID: {item.Query_Id}</h3>
                <p>Query: {item.Queries}</p>
                <p>Query Rising Time: {item.Query_CT}</p>

                <h4>Responses:</h4>
                {item.Response_Id ? (
                  <div>
                    <p>Response ID: {item.Response_Id}</p>
                    <p>Response: {item.Response}</p>
                    <p>Response Rising Time: {item.Response_CT}</p>
                  </div>
                ) : (
                  <p>No responses for this query.</p>
                )}
              </div>
            ) : null
          ))}
        </>
      ) : (
        <h1>No student data found.</h1>
      )}
    </div>
  );
}

export default StudentDashboard;



