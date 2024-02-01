import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../assets/axiosInstance";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setPasswordErrMsg("");
    setUsernameErrMsg("");
    console.log(userData);
  };

  const isPasswordValid = (password: string): boolean => {
    const isLengthValid = password.length > 7;
    const hasUppercase = /[A-Z]/.test(password);
    return isLengthValid && hasUppercase;
  };

  const submitUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/signup", userData);
      const resData = response.data;
      console.log(resData);
      navigate("/signin");
    } catch (error: any) {
      if (error.response.status == 401) {
        setUsernameErrMsg(error.response.data.message);
      } else {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isPasswordValid(userData.password)) {
      setPasswordErrMsg("Password is not valid.");
      return;
    }

    submitUserDetails();
  };
  return (
    <Stack
      justifyContent="space-evenly"
      alignItems="center"
      minHeight="100vh"
      bgcolor={grey[200]}
    >
      <Typography>T</Typography>
      <Box
        component="form"
        autoComplete="on"
        onSubmit={handleSubmit}
        px={10}
        py={6}
        bgcolor="#fff"
        width={800}
        height={530}
        borderRadius={5}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Box width={50}>
            <img src="/pakam-icon.png" width="100%" />
          </Box>
          <Typography>Pakam</Typography>
        </Stack>
        <Typography textAlign="center">Create Account</Typography>

        <Stack direction="row" spacing={2} py={2}>
          <Box width="50%">
            <Typography>First name</Typography>
            <TextField
              fullWidth
              required
              name="firstname"
              value={userData.firstname}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </Box>
          <Box width="50%">
            <Typography>Last name</Typography>
            <TextField
              fullWidth
              required
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} py={2}>
          <Box width="50%">
            <Typography>Username</Typography>
            <TextField
              fullWidth
              required
              helperText={usernameErrMsg}
              error={usernameErrMsg ? true : false}
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </Box>
          <Box width="50%">
            <Typography>Password</Typography>
            <TextField
              fullWidth
              required
              error={passwordErrMsg ? true : false}
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              helperText="Must be 8 characters long, Uppercase inclusive"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>

        <Stack alignItems="center">
          <Box position="relative">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ px: 20, py: 1.5 }}
            >
              Create
            </Button>
            {loading && (
              <CircularProgress
                size={40}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-20px",
                  marginLeft: "-20px",
                }}
              />
            )}
          </Box>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          p={3}
        >
          <Typography>Forgot Password? </Typography>
          <Button>Retrieve Now</Button>
        </Stack>
      </Box>
      <Typography>Powered by Pakam Technology</Typography>
    </Stack>
  );
}
