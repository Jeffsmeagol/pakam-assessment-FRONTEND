import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Close,
  NavigateBefore,
  NavigateNext,
  Refresh,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CreateModal from "../components/CreateModal";
import UpdateModal from "../components/UpdateModal";
import DeleteModal from "../components/DeleteModal";
import axiosInstance from "../assets/axiosInstance";
import SimpleBackdrop from "../components/SimpleBackdrop";

interface Assessment {
  _id: any;
  name: string;
  description: string;
  quantity: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [assessments, setAssessments] = useState<Assessment[] | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/assessments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const resData = await response.data;
        setAssessments(resData);
        console.log(assessments);
        console.log(localStorage.getItem("token"));
        setLoading(false)
      } catch (error: any) {
        console.log(error.message);
        navigate("/signin");
      }
    };

    fetchData();
  }, [reload]);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <IconButton size="small" onClick={handleSnackbarClose}>
      <Close fontSize="small" />
    </IconButton>
  );
  return (
    <>
      {/* <SimpleBackdrop loading={loading} /> */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Deleted Successfully"
        action={action}
      />

      <Stack direction="row" bgcolor={grey[200]}>
        <Box width="15%" minHeight="100vh" bgcolor="primary.main"></Box>

        <Stack p={4} width="85%" spacing={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Assessment</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
              }}
            >
              log out
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <CreateModal setReload={setReload} />
          </Stack>

          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#fff"
              // p={1}
              px={4}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton>
                  <Refresh />
                </IconButton>
                <Typography>Refresh</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={4}>
                <Stack direction="row" spacing={2}>
                  <Typography>01</Typography>
                  <Typography>of</Typography>
                  <Typography>01</Typography>
                </Stack>
                <Stack direction="row" spacing={3}>
                  <IconButton>
                    <NavigateBefore />
                  </IconButton>
                  <IconButton>
                    <NavigateNext />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              bgcolor="#fff"
              p={1}
              px={4}
            >
              <Typography width="25%">Name</Typography>
              <Typography width="25%">Description</Typography>
              <Typography width="20%">Quantity</Typography>
              <Typography width="30%" textAlign="center">
                Action
              </Typography>
            </Stack>

            {assessments?.map((assessment) => (
              <Stack
                key={assessment._id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                bgcolor="#fff"
                p={1}
                px={4}
              >
                <Typography width="25%">{assessment.name}</Typography>
                <Typography width="25%">{assessment.description}</Typography>
                <Typography width="20%">{assessment.quantity}</Typography>
                <Stack
                  width="30%"
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  <UpdateModal assessment={assessment} setReload={setReload} />
                  <DeleteModal
                    id={assessment._id}
                    name={assessment.name}
                    setReload={setReload}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
