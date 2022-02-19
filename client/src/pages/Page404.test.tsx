import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Page from "../components/Page";
import ThemeConfig from "../theme";
import { store } from "../store";
import Page404 from "./Page404";

xdescribe("Page404 Component", () => {
  test("renders the Page404 Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <ThemeConfig>
            <Page title="404 Page">
              <Page404 />
            </Page>
          </ThemeConfig>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});