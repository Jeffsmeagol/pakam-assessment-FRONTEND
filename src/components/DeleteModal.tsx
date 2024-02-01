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
  setReload,
}: {
  id: any;
  name: string;
  setReload: any;
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
    } catch (error: any) {
      console.log(error.message);
      navigate("/signin");
    } finally {
      setLoading(false);
      setReload(true)
      handleClose();
    }
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Delete
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <Typography>Delete {name} Assessment</Typography>
          <Typography p={4} pl={0}>
            Are you sure you want to delete this assessment?
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined">Cancel</Button>
            <Box position="relative">
              <Button
                variant="contained"
                onClick={deleteAssessment}
                disabled={loading}
              >
                Submit
              </Button>
              {loading && (
                <CircularProgress
                  size={40}
                  color="error"
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
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
