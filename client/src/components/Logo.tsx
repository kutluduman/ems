import { Box } from "@mui/material";

interface LogoProps {
  sx?: { [key: string]: number };
}

const Logo = ({ sx }: LogoProps): JSX.Element => {
  return (
    <Box
      component="img"
      src="https://minimal-kit-react.vercel.app/static/logo.svg"
      sx={{ width: 40, height: 40, ...sx }}
    />
  );
}

export default Logo;
