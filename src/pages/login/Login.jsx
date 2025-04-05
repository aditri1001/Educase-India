import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const textFieldStyles = {
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#6C48C5' // Purple color when focused
    },
    '& .MuiOutlinedInput-root': {
      height: '40px'
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginTop: '4px'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate email on change
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value && !validateEmail(value) ? 'Please enter a valid email address' : ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation before submit
    const emailValid = validateEmail(formData.email);
    setErrors(prev => ({
      ...prev,
      email: !emailValid ? 'Please enter a valid email address' : ''
    }));

    if (emailValid && formData.password) {
      console.log('Login submitted:', formData);
      navigate('/account-settings');
    }
  };

  const isFormValid = validateEmail(formData.email) && formData.password;

  return (
    <div className="login-page-wrapper">
      <div className="login-border-container">
        <div className="login-content-top">
          <h1 className="login-title">Signin to your PopX account</h1>
          
          <p className="login-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              size="small"
              error={!!errors.email}
              helperText={errors.email}
              sx={textFieldStyles}
            />
            
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              size="small"
              sx={textFieldStyles}
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isFormValid}
              sx={{
                padding: '10px 20px',
                backgroundColor: isFormValid ? '#6c5ce7' : '#e0e0e0',
                color: isFormValid ? 'white' : '#999',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                marginTop: '15px',
                transition: 'background-color 0.3s',
                textTransform: 'none',
                minHeight: '40px',
                lineHeight: '1.25',
                '&:hover': {
                  backgroundColor: isFormValid ? '#5649c0' : '#e0e0e0'
                }
              }}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;