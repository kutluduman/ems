import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import NavSection from "./NavSection";

describe("NavSection Component", () => {
  test("renders the NavSection Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <NavSection open={true} navConfig={[]} />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});