import { Close } from "@mui/icons-material";
import {
  IconButton,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarContent,
} from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function DeleteSnackBar({
  openDeleteSnackBar,
  setOpenDeleteSnackBar,
}: {
  openDeleteSnackBar: boolean;
  setOpenDeleteSnackBar: (param: boolean) => void;
}) {
  // const handleOpen = () => setOpenDeleteSnackBar(true);
  const handleClose = () => setOpenDeleteSnackBar(false);

  const action = (
    <IconButton onClick={handleClose}>
      <Close sx={{ color: "white" }} />
    </IconButton>
  );

  return (
    <>
      <Snackbar
        open={openDeleteSnackBar}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
        transitionDuration={500}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message="Deleted successfully!"
          action={action}
          sx={{
            bgcolor: (theme) => theme.palette.primary.light,
            fontSize: "1rem",
            pl: 6,
          }}
        />
      </Snackbar>
    </>
  );
}
