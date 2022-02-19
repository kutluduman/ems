import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../../store";
import RegisterForm from "./RegisterForm";

describe("RegisterForm Component", () => {
  test("renders the RegisterForm Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <RegisterForm />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});