import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import MHidden, { Width } from "../components/HideForWidth";
import AuthLayout from "../layouts/AuthLayout";
import PageIllustration from "../components/PageIllustration";
import RegisterForm from "../components/auth/RegisterForm";
import RegisterIllustration from "../assets/register.svg";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const Register = () => {
  return (
    <RootStyle>
      <AuthLayout>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
      </AuthLayout>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Easily sign up and use the portal features
            </Typography>
          </Box>

          <RegisterForm />

          <MHidden width={Width.smUp}>
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>

      <MHidden width={Width.mdDown}>
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage Efficiently!
          </Typography>
          <PageIllustration alt="register" src={RegisterIllustration} />
        </SectionStyle>
      </MHidden>
    </RootStyle>
  );
}
export default Register;