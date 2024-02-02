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
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../assets/axiosInstance";

export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setPasswordErrMsg("");
    setUsernameErrMsg("");
    console.log(userData);
  };

  const submitUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/login", userData);
      const resData = response.data;
      console.log(resData);
      localStorage.setItem("token", resData.token);
      navigate("/");
    } catch (error: any) {
      if (error.response.status == 401) {
        setUsernameErrMsg(error.response.data.message);
      }
      if (error.response.status == 402) {
        setPasswordErrMsg(error.response.data.message);
      } else {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    submitUserDetails();
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={grey[400]}
    >
      <Box
        px={10}
        py={3}
        bgcolor="#fff"
        borderRadius={5}
      >
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Box width={50}>
            <img src="/pakam-icon.png" width="100%" />
          </Box>
          <Typography variant="h6">Pakam</Typography>
        </Stack>
        <Typography variant="h5" textAlign="center" py={2}>Login</Typography>

        <Stack
          component="form"
          autoComplete="on"
          onSubmit={handleSubmit}
          spacing={2}
          width={500}

        >
          <Box>
            <Typography fontWeight={500}>Username</Typography>
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
          <Box>
            <Typography fontWeight={500}>Password</Typography>
            <TextField
              fullWidth
              required
              error={passwordErrMsg ? true : false}
              helperText={passwordErrMsg}
              type={showPassword ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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
          <Box position="relative">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Log in
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
          <Typography>New to Pakam? </Typography>
          <Link to="/signup">
            <Button>Create an Account</Button>
          </Link>
        </Stack>
      </Box>
      <Typography fontWeight={500} pt={2}>
        Powered by Pakam Technology
      </Typography>
    </Stack>
  );
}
