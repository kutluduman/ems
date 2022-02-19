import { useEffect } from "react";
import SimpleBarReact from "simplebar-react";
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";


const RootStyle = styled("div")({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",

  "& .simplebar-wrapper": {
    "&.simplebar-placeholder": {
      height: 0,
    },
  },
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));


interface ScrollbarProps {
  [key: string]: any;
}

const Scrollbar = ({ children, sx, ...other }: ScrollbarProps) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  useEffect(() => {
    const simpleBarPlaceholder = document.querySelector(
      ".simplebar-placeholder"
    ) as HTMLDivElement;
    if (simpleBarPlaceholder) {
      simpleBarPlaceholder.style.height = "0px";
    }
  }, []);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}
export default Scrollbar;
