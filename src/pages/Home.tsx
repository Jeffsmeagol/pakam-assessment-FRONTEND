import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavigateBefore, NavigateNext, Refresh } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import CreateModal from "../components/CreateModal";
import UpdateModal from "../components/UpdateModal";
import DeleteModal from "../components/DeleteModal";
import axiosInstance from "../assets/axiosInstance";
import DeleteSnackBar from "../components/DeleteSnackBar";

interface Assessment {
  _id: any;
  name: string;
  description: string;
  quantity: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [homeLoading, setHomeLoading] = useState(true);
  const [assessments, setAssessments] = useState<Assessment[] | null>(null);
  const [openDeleteSnackBar, setOpenDeleteSnackBar] = useState(false);

  useEffect(() => {
    const fetchData = setTimeout(async () => {
      try {
        const response = await axiosInstance.get("/assessments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const resData = await response.data;
        setAssessments(resData);
        console.log(assessments);
        console.log(response);
        setHomeLoading(false);
      } catch (error: any) {
        console.log(error.message);
        navigate("/signin");
      }
    }, 100);

    return () => clearTimeout(fetchData);
  }, [homeLoading]);

  return (
    <>
      <DeleteSnackBar
        openDeleteSnackBar={openDeleteSnackBar}
        setOpenDeleteSnackBar={setOpenDeleteSnackBar}
      />
      <Stack direction="row" bgcolor={grey[200]}>
        <Box width="15%" minHeight="100vh" bgcolor="primary.main"></Box>

        <Stack p={4} width="85%" spacing={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Assessment</Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
              }}
            >
              log out
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <CreateModal setHomeLoading={setHomeLoading} />
          </Stack>

          <Stack spacing={0.5}>
            <Stack
              direction="row"
              justifyContent="space-between"
              bgcolor="#fff"
              px={4}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton>
                  <Refresh />
                </IconButton>
                <Typography fontWeight={500}>Refresh</Typography>
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
              <Typography fontWeight={700} width="25%">
                Name
              </Typography>
              <Typography fontWeight={700} width="25%">
                Description
              </Typography>
              <Typography fontWeight={700} width="20%">
                Quantity
              </Typography>
              <Typography fontWeight={700} width="30%" textAlign="center">
                Action
              </Typography>
            </Stack>
            {homeLoading ? (
              <Stack
                justifyContent="center"
                alignItems="center"
                height="50vh"
                // bgcolor={green[400]}
              >
                <CircularProgress />
              </Stack>
            ) : (
              assessments?.map((assessment) => (
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
                  <Typography pl={2} width="20%">
                    {assessment.quantity}
                  </Typography>
                  <Stack
                    width="30%"
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                  >
                    <UpdateModal
                      assessment={assessment}
                      setHomeLoading={setHomeLoading}
                    />
                    <DeleteModal
                      id={assessment._id}
                      name={assessment.name}
                      setHomeLoading={setHomeLoading}
                      setOpenDeleteSnackBar={setOpenDeleteSnackBar}
                    />
                  </Stack>
                </Stack>
              ))
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
