import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeConfig from "../../theme";
import { store } from "../../store";
import DashboardSidebar from "./DashboardSidebar";

describe("DashboardSidebar Component", () => {
  test("renders the DashboardSidebar Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <ThemeConfig>
            <DashboardSidebar isOpenSidebar={false} onCloseSidebar={() => {}} />
          </ThemeConfig>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});