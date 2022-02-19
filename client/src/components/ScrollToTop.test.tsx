import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop Component", () => {
  test("renders the ScrollToTop Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <ScrollToTop />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});