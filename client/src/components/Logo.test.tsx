import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import Logo from "./Logo";

describe("Logo Component", () => {
  test("renders the Logo Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <Logo />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});