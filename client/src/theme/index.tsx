import { useMemo } from "react";
import { CssBaseline, ThemeOptions } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";

interface ThemeConfigProps {
  children: React.ReactNode;
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const themeOptions = useMemo<ThemeOptions>(
    () =>
      ({
        // Customizations
      } as never as ThemeOptions),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}