const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mysql');
const student_Router = require('./studentRoute')
const mentor_Router = require('./mentorRoute')


const app = express();
app.use(student_Router);
app.use(mentor_Router);
app.use(bodyParser.urlencoded())

app.use(express.json());
app.use(cors());
var user;





app.post('/login', (req, res) => {
    // console.log("Request Result: "+req.body);
    const { userEmail } = req.body;


    if ( !userEmail=='deenadhayalan.ec@gmail.com' && !userEmail.endsWith('@bitsathy.ac.in')) {
        console.log("Invalied Domine User");
        return;
    }
    else {
        const connection = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '950082s*S',
            database: 'mentor_student_portal'
        })

        connection.connect((err) => {
            if (err) throw err;
            console.log("-----Login Database is Connected-----");
        })


        const arr = userEmail.split('.');
        const role = arr.length == 4 ? 'student' : 'mentor';
        const select_mail = arr.length == 4 ? 'std_email' : 'mentor_email'

        const sql_query = `
select *from ${role}
where ${select_mail} in ('${userEmail}') `;
console.log("login role: "+role);

        if(role==='student'){
            console.log("Inside Student")
            connection.query(sql_query, (err, res) => {
                if (err) throw err;
                // console.log("Database ResultL: "+res);
                user = res[0];
                console.log("Student ID: " + res[0].Std_Id);
                console.log("Student Name: " + res[0].Std_Name);
                console.log("Student Email: " + res[0].Std_Email);
                console.log("Student Department: " + res[0].Std_Department);
                console.log("Student Mentor ID: " + res[0].Mentor_Id);
            })
        }
        else if(role==='mentor'){
            console.log("Inside Mentor")
            connection.query(sql_query, (err, res) => {
                if (err) throw err;
                // console.log("Database ResultL: "+res);
                user = res[0];
                console.log("Mentor ID: " + res[0].Mentor_Id);
                console.log("Mentor Name: " + res[0].Mentor_Name);
                console.log("Mentor Email: " + res[0].Mentor_Email);
                console.log("Mentor Department: " + res[0].Mentor_Department);
            })
        }
        


        connection.end((err) => {
            if (err) throw err;
            console.log("-----Login Database connection is End-----");
            console.log('\n');
        })

        
        return res.json({ role, user });

    }




});




app.listen(3001, () => {
    console.log("Server is running on 3001");
});