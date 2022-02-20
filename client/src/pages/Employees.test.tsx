import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import Employees from "./Employees";

describe("Employees Component", () => {
  test("renders the App Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <Employees />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});