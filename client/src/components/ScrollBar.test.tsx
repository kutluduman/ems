import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import ScrollBar from "./ScrollBar";

describe("ScrollBar Component", () => {
  test("renders the ScrollBar Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <ScrollBar title="ScrollBar Title">
            <h1>Employee</h1>
          </ScrollBar>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});