import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeConfig from "../theme";
import { store } from "../store";
import Login from "./Login";

describe("Login Component", () => {
  test("renders the Login Component", () => {
    const tree = create(
      <Provider store={store}>
        <ThemeConfig>
          <Router>
            <Login />
          </Router>
        </ThemeConfig>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});