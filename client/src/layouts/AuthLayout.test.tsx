import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeConfig from "../theme";
import { store } from "../store";
import AuthLayout from "./AuthLayout";

describe("AuthLayout Component", () => {
  test("renders the AuthLayout Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <ThemeConfig>
            <AuthLayout>
              <h1>Some content</h1>
            </AuthLayout>
          </ThemeConfig>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});