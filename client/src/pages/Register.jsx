import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const user = { username, email, password };

    console.log(user);

    return axios
      .post("http://localhost:8080/api/users/register", { user })
      .then((response) => {
        console.log(response.data);

        if (response.data.success) {
          toast.success("Registration successful! Redirecting to login...", {
            position: "top-center",
            autoClose: 2000, // 3 seconds delay before auto closing
          });
  
          // Delay the navigation to give the toast time to display
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }

        return response.data;
      })
      .catch((error) => {
        console.error("Error performing regristration", error.message);
        toast.error("An error occurred while registering. Please try again.", {
          position: "top-center",
        });
        throw error;
      });
  };

  const validateForm = () => {
    if (username.length < 6) {
      alert("Username must be at least 6 characters long.");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true; // If no validation errors
  };

  // Simple email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <span>Already have an account? <Link to="/">Login here.</Link></span>
      <ToastContainer />
    </div>
  );
};

export default Register;
