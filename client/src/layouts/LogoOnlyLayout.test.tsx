import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import ThemeConfig from "../theme";
import LogoOnlyLayout from "./LogoOnlyLayout";

describe("LogoOnlyLayout Component", () => {
  test("renders the LogoOnlyLayout Component", () => {
    const tree = create(
      <Router>
        <ThemeConfig>
          <LogoOnlyLayout />
        </ThemeConfig>
      </Router>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});