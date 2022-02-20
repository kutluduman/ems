import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import ThemeConfig from "../theme";
import AuthLayout from "./AuthLayout";

describe("AuthLayout Component", () => {
  test("renders the AuthLayout Component", () => {
    const tree = create(
      <Router>
        <ThemeConfig>
          <AuthLayout>
            <h1>Some content</h1>
          </AuthLayout>
        </ThemeConfig>
      </Router>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});