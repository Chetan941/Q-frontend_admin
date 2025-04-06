import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        setError(data.error);
        alert("Registration Failed, Contact Admin")
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="registerSection">
      {loading && 
        <div className="loaderSection">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p>Hi, Your Registration under process</p>
        </div>
      }

      {!loading && 
        <form className='authForm' onSubmit={handleSubmit} autoComplete='off'>
          <h3>Vendor Register</h3>

          <label>Username</label>
          <input 
            type="text" 
            name='username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder='Enter your name' 
          /><br />

          <label>Email</label>
          <input 
            type="text" 
            name='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your email' 
          /><br />

          <label>Password</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              name='password' 
              placeholder='Enter your password'
              style={{
                flex: 1,
                padding: '8px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <span 
              className='showPassword'
              onClick={handleShowPassword}
              style={{ cursor: 'pointer', color: 'white' }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div><br />

          <div className="btnSubmit">
            <button type='submit'>Submit</button>
          </div>
        </form>
      }
    </div>
  );
};

export default Register;
