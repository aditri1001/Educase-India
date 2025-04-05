import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import './CreateAccount.css';

function CreateAccount() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: null,
    profilePhoto: null
  });
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: ''
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value && !validateEmail(value) ? 'Please enter a valid email address' : ''
      }));
    }

    if (name === 'phoneNumber') {
      setErrors(prev => ({
        ...prev,
        phoneNumber: value && !validatePhoneNumber(value) ? 'Please enter a valid phone number (10-15 digits)' : ''
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValid = validateEmail(formData.email);
    const phoneValid = validatePhoneNumber(formData.phoneNumber);

    setErrors({
      email: !emailValid ? 'Please enter a valid email address' : '',
      phoneNumber: !phoneValid ? 'Please enter a valid phone number (10 digits)' : ''
    });

    if (emailValid && phoneValid) {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/account-settings');
    }
  };

  // Custom styling for TextField labels
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

  return (
    <div className="create-account-wrapper">
      <div className="create-account-container">
        <div className="create-account-content">
          <h1 className="create-account-title">
            Create your<br />PopX account
          </h1>

          <form className="create-account-form" onSubmit={handleSubmit}>
            <TextField
              id="fullName"
              name="fullName"
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.fullName}
              onChange={handleChange}
              required
              size="small"
              sx={textFieldStyles}
            />

            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              size="small"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              sx={textFieldStyles}
            />

            <TextField
              id="email"
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
              id="password"
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

            <TextField
              id="companyName"
              name="companyName"
              label="Company Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.companyName}
              onChange={handleChange}
              size="small"
              sx={textFieldStyles}
            />

            <FormLabel component="legend" style={{ marginTop: '16px' }}>Are you an Agency?*</FormLabel>
            <RadioGroup
              row
              name="isAgency"
              value={formData.isAgency}
              onChange={(e) => setFormData(prev => ({ ...prev, isAgency: e.target.value }))}
              style={{ marginBottom: '16px' }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>

            <div className="form-group">
              <Button
                variant="outlined"
                component="label"
                style={{
                  marginBottom: '16px',
                  height: '40px',
                  textTransform: 'none'
                }}
              >
                {formData.profilePhoto ? 'Change Profile Photo' : 'Upload Profile Photo'}
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                />
              </Button>
              {formData.profilePhoto && (
                <div className="photo-preview">
                  <img src={formData.profilePhoto} alt="Profile Preview" />
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                padding: '10px 20px', // Reduced from 12px to 10px (top/bottom)
                backgroundColor: '#6c5ce7',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                marginTop: '15px',
                transition: 'background-color 0.3s',
                textTransform: 'none',
                minHeight: '40px', // Explicit height control
                lineHeight: '1.25', // Better text vertical alignment
                '&:hover': {
                  backgroundColor: '#5649c0'
                }
              }}
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;