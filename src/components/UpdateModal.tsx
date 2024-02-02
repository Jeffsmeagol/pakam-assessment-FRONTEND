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
  setHomeLoading,
}: {
  assessment?: Assessment;
  setHomeLoading: any;
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
      setHomeLoading(true);
    } catch (error: any) {
      if (
        error.response.status == 401 ||
        error.response.status == 402 ||
        error.response.status == 403
      ) {
        console.log(error.message);
        navigate("/signin");
      }
      console.log(error.message);
    } finally {
      setLoading(false);
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Typography variant="h6">Update Assessment</Typography>
          <Box
            component="form"
            autoComplete="on"
            onSubmit={handleSubmit}
            py={4}
          >
            <Stack direction="row" width={500} spacing={2}>
              <Box width="50%">
                <Typography pb={1}>Name</Typography>
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
                <Typography pb={1}>Quantity</Typography>
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
              <Typography pb={1}>Description</Typography>
              <TextField
                fullWidth
                required
                name="description"
                value={assessmentData.description}
                onChange={handleChange}
                placeholder="Enter the description"
              />
            </Box>
            <Box position="relative" width="fit-content">
              <Button variant="contained" type="submit" disabled={loading}>
                Submit
              </Button>
              {loading && (
                <CircularProgress
                  size={30}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-15px",
                    marginLeft: "-15px",
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
