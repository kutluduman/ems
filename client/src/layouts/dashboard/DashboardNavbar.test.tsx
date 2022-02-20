import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeConfig from "../../theme";
import { store } from "../../store";
import DashboardNavbar from "./DashboardNavbar";

describe("DashboardNavbar Component", () => {
  test("renders the DashboardNavbar Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <ThemeConfig>
            <DashboardNavbar />
          </ThemeConfig>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});