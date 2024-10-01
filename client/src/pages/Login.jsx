import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    console.log(data); // Do something with the response

    if(data.success) {
        navigate('/home');
    }
    else {
        alert("Incorrect username or password.");
    }
  };


  return (
    <div>

    
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
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
      <button type="submit">Login</button>
    </form>
    <span>Don&apos;t have an account? <Link to="/register">Register here.</Link></span>
    </div>
  );
};

export default Login;
