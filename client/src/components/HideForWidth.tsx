import { ReactElement } from "react";
import { Breakpoint, Theme, useMediaQuery } from "@mui/material";

export enum Width {
  xsDown = "xsDown",
  smDown = "smDown",
  mdDown = "mdDown",
  lgDown = "lgDown",
  xlDown = "xlDown",
  xsUp = "xsUp",
  smUp = "smUp",
  mdUp = "mdUp",
  lgUp = "lgUp",
  xlUp = "xlUp",
}

interface HideForWidthProps {
  width: Width;
  children?: React.ReactNode;
}

const HideForWidth = ({
  width,
  children,
}: HideForWidthProps): ReactElement<any> => {
  const breakpoint = width.substring(0, 2) as Breakpoint;

  const hiddenUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(breakpoint)
  );
  const hiddenDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  );

  if (width.includes("Down")) {
    return (hiddenDown ? null : children) as ReactElement;
  }

  if (width.includes("Up")) {
    return (hiddenUp ? null : children) as ReactElement;
  }

  return null as never as ReactElement;
}
export default HideForWidth;