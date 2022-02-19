import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import ThemeConfig from "../../theme";
import { store } from "../../store";
import MHidden, { Width } from "./MHidden";

describe("MHidden Component", () => {
  test("renders the MHidden Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <ThemeConfig>
            <MHidden width={Width.lgDown}>
              <h1>Some Content</h1>
            </MHidden>
          </ThemeConfig>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});