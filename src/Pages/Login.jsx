import "../App.css";
import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post('http://localhost:2024/user/login', credentials);

      if (response.status === 200 && response.data.data.token) {
        if (rememberMe) {
          localStorage.setItem("token", response.data.data.token);
        } else {
          sessionStorage.setItem("token", response.data.data.token);
        }
        toast.success("Login successful! Redirecting...", {
          onClose: () => {
            navigate("/");
          },
          autoClose: 700,
        });
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Invalid Credentials. Please check your email.");
      } else if (error.response.status === 401) {
        toast.error("Incorrect Password. Please try again.");
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="85vh"
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
            <Typography variant="h5" color="textPrimary" align="left" gutterBottom>
              Sign in to your Account
            </Typography>
            <Typography variant="body1" color="textSecondary" align="left" gutterBottom style={{ marginBottom: "22px" }}>
              Welcome back! Please enter your details.
            </Typography>
            <form onSubmit={onSubmit} noValidate>
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
                style={{ marginBottom: "10px" }}
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
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                style={{ marginBottom: "20px" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={rememberMe}
                      onChange={handleRememberMeChange} 
                      color="primary"
                    />
                  }
                  label="Remember Me"
                />
                <Link to="/login" style={{ color: "#3f51b5", textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </Box>
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
                Login
              </Button>
            </form>
            <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: "20px" }}>
              Don't have an account? <Link to="/register" style={{ color: "#3f51b5", textDecoration: "none" }}>Register</Link>
            </Typography>
          </Paper>
        </Box>
      </Container>
      <ToastContainer 
        position="top-right" 
        autoClose={1500} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
      />
    </div>
  );
};

export default Login;
