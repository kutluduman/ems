import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import MenuPopover from "./MenuPopover";

describe("MenuPopover Component", () => {
  test("renders the MenuPopover Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <MenuPopover open={false} />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});