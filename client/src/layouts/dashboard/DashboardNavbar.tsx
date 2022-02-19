import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";

import { MHidden, Width } from "../../components/@material-extend";
import AccountPopover from "./AccountPopover";

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

interface DashboardNavbarProps {
  onOpenSidebar: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const DashboardNavbar = ({
  onOpenSidebar,
}: DashboardNavbarProps) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width={Width.lgUp}>
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <MenuOpenIcon />
          </IconButton>
        </MHidden>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

export default DashboardNavbar;