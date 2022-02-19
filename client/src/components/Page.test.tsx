import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import Page from "./Page";

xdescribe("Page Component", () => {
  test("renders the Page Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <Page title="Page Title">
            <h1>Employee</h1>
          </Page>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});