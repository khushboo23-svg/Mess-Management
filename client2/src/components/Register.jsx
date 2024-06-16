import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register_student } from "../redux/studentSlice";
import Footer from "./Footer";

function Register() {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [hostelOptions, setHostelOptions] = useState([]);
  const [hostelName, setHostelName] = useState('');
  const [email, setEmail] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch hostel options from the API
    console.log("GET HOSTEL")
    console.log(`${process.env.REACT_APP_BACK_END_URL}/getAllHostels`)
    axios.get(`${process.env.REACT_APP_BACK_END_URL}/getAllHostels`)
      .then(response => {
        console.log(response.data.data.hostels);
        setHostelOptions(response.data.data.hostels);
      })
      .catch(error => {
        console.error('Error fetching hostel options:', error);
        toast.error("Error fetching hostel options");
      });
  }, []);

  const handleHostelChange = (e) => {
    setHostelName(e.target.value);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      return;
    }

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/registerStudent`, {
      name,
      regNo,
      hostelName,
      email,
      password,
      recoveryEmail,
      roomNo
    })
      .then(res => {
        if (res.data.status === 200 && res.data.data) {
          if (password === confirmPassword) {
            
            dispatch(register_student(res.data));
            navigate('/student')
            toast.success("Registration Successful!");
          } else {
            toast.error("Password Not matching!");
          }
        } else {
          toast.error("Registration Unsuccessful! Please check your credentials.")
        }
      })
      .catch(err => {
        console.log(err);
        toast.error("Error registering user");
      });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit} className="reg_form">
          <div className="brand">
            <h3 style={{color : "white"}}>STUDENT REGISTER</h3>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Registration Number"
            name="regNo"
            onChange={(e) => setRegNo(e.target.value)}
          />
          {/* Dropdown for Hostel Name */}
          <select
            value={hostelName}
            onChange={handleHostelChange}
          >
            <option value="" disabled className="text-dark">Select Hostel</option>
            {hostelOptions.map(hostel => (
              <option key={hostel._id} value={hostel.hostelName} className="text-dark">
                {hostel.hostelName}
              </option>
            ))}
          </select>
          
          <input
            type="email"
            placeholder="G-Suit Id"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="email"
            placeholder="Recovery Email"
            name="recovery_email"
            onChange={(e) => setRecoveryEmail(e.target.value)}
          />
          <input
            type="Number"
            placeholder="Room Number"
            name="roomNo"
            onChange={(e) => setRoomNo(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/Student">Login</Link>
          </span>
        </form>
      </FormContainer>
      <Footer/>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: #001F3F;
  overflow: hidden;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h3 {
      color: yellow;
      text-transform: uppercase;
    }
  }
  form {
    width: 45%;  // Default width suitable for larger screens
    height: auto;  // Changed to auto for better responsiveness
    margin-top: 4rem;
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 7rem;
    padding-bottom: 5rem;

    input,
    select {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid skyblue;
      border-radius: 0.5rem;
      color: white;
      width: 100%;
      font-size: 90%;
      &:focus {
        border: 0.1rem solid blue;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 0.3rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1.7rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: green;
      }
    }
    span {
      color: white;
      font-size: 100%;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
      word-spacing: 2px;
    }

    @media (max-width: 1054px) {
      width: 60%;  // Use more of the screen on smaller devices
      padding: 2rem 2rem;  // Reduce padding
    }

    @media (max-width: 768px) {
      width: 90%;  // Use more of the screen on smaller devices
      padding: 2rem 2rem;  // Reduce padding
    }

    @media (max-width: 480px) {
      width: 84%;  // Use full width for very small devices
      padding: 1rem 1rem;  // Further reduce padding
      font-size: 90%;  // Adjust font size slightly
    }
  }
`;


export default Register;
