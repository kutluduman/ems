import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeConfig from "../theme";
import { store } from "../store";
import LogoOnlyLayout from "./LogoOnlyLayout";

describe("LogoOnlyLayout Component", () => {
  test("renders the LogoOnlyLayout Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <ThemeConfig>
            <LogoOnlyLayout />
          </ThemeConfig>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});