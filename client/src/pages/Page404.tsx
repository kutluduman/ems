import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";

import Page from "../components/Page";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const Page404 = () => {
  return (
    <RootStyle title="404 Page Not Found | EMS">
      <Container>
        <Typography variant="h3" paragraph>
          Sorry, page not found!
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>
        <Box
          component="img"
          src="https://minimal-kit-react.vercel.app/static/illustrations/illustration_404.svg"
          sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
        />
        <Button to="/" size="large" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </Container>
    </RootStyle>
  );
}

export default Page404;
