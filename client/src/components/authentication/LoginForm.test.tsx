import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../../store";
import LoginForm from "./LoginForm";

describe("LoginForm Component", () => {
  test("renders the LoginForm Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});