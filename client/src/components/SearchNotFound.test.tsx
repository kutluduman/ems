import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import SearchNotFound from "./SearchNotFound";

describe("SearchNotFound Component", () => {
  test("renders the SearchNotFound Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <SearchNotFound searchQuery="Search Query" />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});