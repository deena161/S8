

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mysql');

const mtr = express();
mtr.use(bodyParser.urlencoded({ extended: true }));
mtr.use(express.json());
mtr.use(cors());

console.log("Mentor Route is connected");

// MySQL connection setup
const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '950082s*S',
    database: 'mentor_student_portal'
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("-----Mentor Routes Database is Connected-----");
});

// Endpoint to get mentor and student details along with queries and responses
mtr.get('/mentor-route', (req, res) => {
    const { mentor_ID } = req.query;

    // First query to get mentor and student details
    const sql_query = `
        SELECT 
            M.Mentor_Id, 
            M.Mentor_Name, 
            M.Mentor_Email, 
            M.Mentor_Department, 
            S.Std_Id, 
            S.Std_Name, 
            S.Std_Email
        FROM 
            Mentor M 
        LEFT JOIN 
            Student S ON M.Mentor_Id = S.Mentor_Id 
        WHERE 
            M.Mentor_Id = ?;`;

    // Second query to get queries and responses
    const sql_query2 = `
        SELECT 
            q.Std_Id,
            s.Std_Name,
            q.Query_Id,
            q.Queries,
            q.Query_CT,
            r.Response_Id,
            r.Response,
            r.Response_CT
        FROM 
            Mentor M 
        LEFT JOIN 
            Query q ON M.Mentor_Id = q.Mentor_Id
        LEFT JOIN 
            Response r ON q.Query_Id = r.Query_Id
        LEFT JOIN
            Student s ON q.Std_Id = s.Std_Id
        WHERE 
            M.Mentor_Id = ?;`;

    // Execute the first query
    connection.query(sql_query, [mentor_ID], (err, mentorResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Execute the second query
        connection.query(sql_query2, [mentor_ID], (err, queryResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database query failed' });
            }

            // Combine the results
            const response = {
                mentor: mentorResults,
                queries: queryResults
            };

            console.log(response);
            res.json(response); // Send the combined results back to the client
        });
    });
});

// Endpoint to submit a response to a query
mtr.post('/submit-response', (req, res) => {
    const { queryId, response } = req.body;

    // SQL query to insert the response into the Response table
    const sql_insert = `
        INSERT INTO Response (Query_Id, Response, Response_CT) 
        VALUES (?, ?, NOW());`;

    connection.query(sql_insert, [queryId, response], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to submit response' });
        }

        console.log("Response submitted successfully:", result);
        res.json({ message: 'Response submitted successfully' });
    });
});

// End the connection when the server is closed
process.on('SIGINT', () => {
    connection.end((err) => {
        if (err) throw err;
        console.log("-----Database Connection ended-----");
        process.exit(0);
    });
});

module.exports = mtr;