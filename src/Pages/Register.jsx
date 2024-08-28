import "../App.css";
import React, { useState } from "react";
import { Typography, Container, Box, Paper, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = (user) => {
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
      toast.error("Please fill out all fields.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (!validateForm(user)) return;

    try {
      const response = await axios.post('http://localhost:2024/user/register', user);
      console.log(response);
      if (response.data.data && response.data.data._id) {
        toast.success("User Registered successfully! Redirecting to login...", {
          onClose: () => navigate("/login"),
          autoClose: 700,
        });
      } else {
        toast.error("Registration failed: No user ID returned.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;

        if (errorMessage === "User already exists" || errorMessage.data === "User already exists") {
          toast.error("User already exists. Please try with a different email.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <Container component="main" maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <Paper 
            elevation={6} 
            style={{ 
              padding: "30px", 
              width: "100%", 
              borderRadius: "15px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Typography variant="h5" color="textPrimary" align="left" gutterBottom style={{ marginBottom: "28px" }}>
              Sign Up for an Account
            </Typography>
            <form onSubmit={onSubmit} noValidate>
              <TextField
                type="text"
                label="First Name"
                variant="outlined"
                name="first_name"
                required
                fullWidth
                style={{ marginBottom: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="text"
                label="Last Name"
                variant="outlined"
                name="last_name"
                required
                fullWidth
                style={{ marginBottom: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                name="email"
                required
                fullWidth
                style={{ marginBottom: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                name="password"
                required
                fullWidth
                style={{ marginBottom: "30px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                style={{
                  padding: "15px 0",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Register
              </Button>
            </form>
            <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: "20px" }}>
              Already have an account? <Link to="/login" style={{ color: "#3f51b5", textDecoration: "none" }}>Login</Link>
            </Typography>
          </Paper>
        </Box>
      </Container>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable />
    </div>
  );
};

export default Register;
