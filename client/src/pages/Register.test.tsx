import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeConfig from "../theme";
import { store } from "../store";
import Register from "./Register";

describe("Register Component", () => {
  test("renders the Register Component", () => {
    const tree = create(
      <Provider store={store}>
        <ThemeConfig>
          <Router>
            <Register />
          </Router>
        </ThemeConfig>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});