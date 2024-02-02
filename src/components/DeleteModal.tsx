import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../assets/axiosInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "1rem",
  bgcolor: "#fff",
  p: 4,
};

export default function DeleteModal({
  id,
  name,
  setHomeLoading,
}: {
  id: any;
  name: string;
  setHomeLoading: any;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteAssessment = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/assessments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Delete
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Typography variant="h6">Delete {name} Assessment</Typography>
          <Typography p={4} pl={0}>
            Are you sure you want to delete this assessment?
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <Box position="relative" width="fit-content">
              <Button
                variant="contained"
                color="error"
                onClick={deleteAssessment}
                disabled={loading}
              >
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
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
