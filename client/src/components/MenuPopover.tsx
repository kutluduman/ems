import { Popover, Theme } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const ArrowStyle = styled("span")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: "absolute",
    borderRadius: "0 0 4px 0",
    transform: "rotate(-135deg)",
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

interface MenuPopoverProps {
  [key: string]: any;
}

const MenuPopover = ({
  children,
  sx,
  open,
  ...other
}: MenuPopoverProps) => {
  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: "inherit",
          boxShadow: (theme: any) => theme.customShadows.z20,
          border: (theme: Theme) => `solid 1px ${theme.palette.grey[500]}`,
          width: 200,
          ...sx,
        },
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}

export default MenuPopover;
