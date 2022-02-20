import Box from "@mui/material/Box";
import logo from "../logo.svg";

interface LogoProps {
  sx?: { [key: string]: number };
}

const Logo = ({ sx }: LogoProps): JSX.Element => {
  return (
    <Box component="img" src={logo} sx={{ width: 40, height: 40, ...sx }} />
  );
}
export default Logo;