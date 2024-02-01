import { useState } from "react";
import { Backdrop, CircularProgress} from "@mui/material";

export default function SimpleBackdrop({ loading }: { loading: boolean }) {
  const [open, setOpen] = useState(loading);
  const handleClose = () => {
    setOpen(false);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // useEffect(() => {
  //   const closeData = () => {
  //     if(!loading) handleClose()
  //   };

  //   closeData();
  // }, [loading]);
  return (
    <>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
