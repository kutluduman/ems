import { BrowserRouter as Router } from "react-router-dom";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";

import { store } from "./store";
import App from "./App";

describe("App Component", () => {
  test("renders the App Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});