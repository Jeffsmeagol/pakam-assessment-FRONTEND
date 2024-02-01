import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axiosInstance from "../assets/axiosInstance";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  borderRadius: "1rem",
  bgcolor: "#fff",
  p: 4,
};

interface Assessment {
  _id: any;
  name: string;
  description: string;
  quantity: number;
}

export default function UpdateModal({
  assessment,
  setReload,
}: {
  assessment?: Assessment;
  setReload: any;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    name: assessment?.name,
    description: assessment?.description,
    quantity: assessment?.quantity,
  });

  const handleChange = (e: any) => {
    setAssessmentData({ ...assessmentData, [e.target.name]: e.target.value });
    console.log(assessmentData);
  };

  const submitUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/assessments/${assessment?._id}`,
        assessmentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const resData = response.data;
      console.log(resData);
    } catch (error: any) {
      console.log(error.message);
      navigate("/signin");
    } finally {
      setLoading(false);
      setReload(true);
      handleClose();
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    submitUserDetails();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Update
      </Button>
      <Modal open={open}>
        <Box sx={{ ...style }}>
          <Typography>Update Assessment</Typography>
          <Box
            component="form"
            autoComplete="on"
            onSubmit={handleSubmit}
            py={4}
          >
            <Stack direction="row" width={500} spacing={2}>
              <Box width="50%">
                <Typography>Name</Typography>
                <TextField
                  fullWidth
                  required
                  name="name"
                  value={assessmentData.name}
                  onChange={handleChange}
                  placeholder="Enter the name"
                />
              </Box>
              <Box width="50%">
                <Typography>Quantity</Typography>
                <TextField
                  fullWidth
                  required
                  type="number"
                  name="quantity"
                  value={assessmentData.quantity}
                  onChange={handleChange}
                  placeholder="Enter the quantity"
                />
              </Box>
            </Stack>
            <Box py={3}>
              <Typography>Description</Typography>
              <TextField
                fullWidth
                required
                name="description"
                value={assessmentData.description}
                onChange={handleChange}
                placeholder="Enter the description"
              />
            </Box>
            <Box position="relative">
              <Button variant="contained" type="submit" disabled={loading}>
                Submit
              </Button>
              {loading && (
                <CircularProgress
                  size={40}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "-20px",
                    marginTop: "-20px",
                    marginLeft: "-20px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
