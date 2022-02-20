import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../../store";
import AccountPopover from "./AccountPopover";

describe("AccountPopover Component", () => {
  test("renders the AccountPopover Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <AccountPopover />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});