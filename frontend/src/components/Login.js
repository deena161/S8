
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios for making API calls
// import { jwtDecode } from 'jwt-decode';

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLogin = async (response) => {
//     try {
//       const decodedToken = jwtDecode(response.credential);
//       console.log(decodedToken);
//       const userEmail = decodedToken.email;


//       if (userEmail) {
//         // Send the email to the backend to fetch user details
//         const res = await axios.post('http://localhost:6001/login', { userEmail });
//         const { role, user } = res.data;
//         if (!user) {
//           alert('User  not found. Please check your email.');
//           return;
//         }
//         console.log("Student ID: " + user.Std_Id);
//         console.log("Student Name: " + user.Std_Name);
//         console.log("Student Email: " + user.Std_Email);
//         console.log("Student Department: " + user.Std_Department);
//         console.log("Student Mentor ID: " + user.Mentor_Id);
//         console.log("Role: ", role);




//         if (role === 'student') {
//           sessionStorage.setItem('Id', user.Std_Id)

//           navigate('/student');
//         } else if (role === 'mentor') {
//           sessionStorage.setItem('Id', user.Mentor_Id)
//           navigate('/mentor');
//         }

//       }

//     } catch (error) {
//       console.error('Error fetching user details:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
//     script.onload = () => {
//       window.google.accounts.id.initialize({
//         client_id: '1080247972813-u2lanmghl4051j28lghntv8o4vofo6d3.apps.googleusercontent.com', // Replace with your actual client ID
//         callback: handleLogin,
//       });
//       window.google.accounts.id.renderButton(
//         document.getElementById('google-sign-in-button'),
//         { theme: 'outline', size: 'large' }
//       );
//     };
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Login</h1>
//       <div id="google-sign-in-button"></div>
//     </div>
//   );
// };

// export default Login;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import { jwtDecode } from 'jwt-decode';
import '../css/login.css'; // Import the external CSS for styling

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (response) => {
    try {
      const decodedToken = jwtDecode(response.credential);
      console.log(decodedToken);
      const userEmail = decodedToken.email;

      if (userEmail) {
        // Send the email to the backend to fetch user details
        const res = await axios.post('http://localhost:6001/login', { userEmail });
        const { role, user } = res.data;
        if (!user) {
          alert('User not found. Please check your email.');
          return;
        }
        console.log("Student ID: " + user.Std_Id);
        console.log("Student Name: " + user.Std_Name);
        console.log("Student Email: " + user.Std_Email);
        console.log("Student Department: " + user.Std_Department);
        console.log("Student Mentor ID: " + user.Mentor_Id);
        console.log("Role: ", role);

        if (role === 'student') {
          sessionStorage.setItem('Id', user.Std_Id);
          navigate('/student');
        } else if (role === 'mentor') {
          sessionStorage.setItem('Id', user.Mentor_Id);
          navigate('/mentor');
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '1080247972813-u2lanmghl4051j28lghntv8o4vofo6d3.apps.googleusercontent.com', // Replace with your actual client ID
        callback: handleLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-sign-in-button'),
        { theme: 'outline', size: 'large' }
      );
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="login-container">
      <div className='container'>
        <h1 className="login-subheading">Welcome Back!</h1>
        <div className="logo-container">
          <img
            src='/images/logo.png'
            alt="BIP Logo"
            className="logo"
          />
        </div>
        <h1 className="login-heading">Mentor Student Query Portal</h1>
        <div id="google-sign-in-button" className="google-sign-in-button"></div>
        <p className="login-display">Sign in with your BIT account</p>
      </div>
    </div>
  );
};

export default Login;
