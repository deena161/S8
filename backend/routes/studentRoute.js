


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mysql');

const std = express();
std.use(bodyParser.urlencoded({ extended: true }));
std.use(express.json());
std.use(cors());
console.log("Student Route is connected");

// Existing endpoint to get student data
std.get('/student-route', (req, res) => {
    const { student_ID } = req.query;

    const connection = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '950082s*S',
        database: 'query_portal'
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log("-----Student Routes Database is Connected-----");
    });

    const sql_query = `
        SELECT s.Std_Id, s.Std_Name, s.Std_Email, s.Std_Department, Std_Mobile, Std_Profile_Url,
               m.Mentor_Id, m.Mentor_Name, m.Mentor_Email, m.Mentor_Department, m.Mentor_Mobile, m.Mentor_Profile_Url, 
               q.Query_Id, q.Queries, q.Query_CT, 
               r.Response_Id, r.Response, r.Response_CT 
        FROM student AS s 
        JOIN mentor AS m ON s.Mentor_Id = m.Mentor_Id 
        LEFT JOIN Query AS q ON s.Std_Id = q.Std_Id 
        LEFT JOIN Response AS r ON q.Query_Id = r.Query_Id 
        WHERE s.Std_Id = ?`;

    connection.query(sql_query, [student_ID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        
        console.log(results);
        res.json(results); // Send the results back to the client
    });

    connection.end((err) => {
        if (err) throw err;
        console.log("-----Student Routes Database Connection ended-----");
        console.log("\n");
    });
});

// New endpoint to submit a query
std.post('/submit-query', (req, res) => {
    const { studentId, mentorId, query } = req.body;

    const connection = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '950082s*S',
        database: 'query_portal'
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log("-----Database is Connected for Query Submission-----");
    });

    const sql_query = 'INSERT INTO Query (Std_Id, Mentor_Id, Queries) VALUES (?, ?, ?)';

    connection.query(sql_query, [studentId, mentorId, query], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to submit query' });
        }

        console.log("Query submitted successfully:", results);
        res.status(201).json({ message: 'Query submitted successfully', queryId: results.insertId });
    });

    connection.end((err) => {
        if (err) throw err;
        console.log("-----Database Connection ended after Query Submission-----");
        console.log("\n");
    });
});

module.exports = std;




