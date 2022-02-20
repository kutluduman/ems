import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { logout, selectEmployee } from "../../store/slices/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import EmployeeProfileMenu from "../../components/EmployeeProfileMenu";
import UserAvatar from "../../components/UserAvatar";

const AccountPopover = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectEmployee);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <UserAvatar name={account?.name} surname={account?.surname} />
      </IconButton>

      <EmployeeProfileMenu
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account?.name} {account?.surname}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => {
              dispatch(logout());
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Button>
        </Box>
      </EmployeeProfileMenu>
    </>
  );
}
export default AccountPopover;