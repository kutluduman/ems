import { create } from "react-test-renderer";

import SearchNotFound from "./SearchNotFound";

describe("SearchNotFound Component", () => {
  test("renders the SearchNotFound Component", () => {
    const tree = create(<SearchNotFound searchQuery="Search Query" />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});