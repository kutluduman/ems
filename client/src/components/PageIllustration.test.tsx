import { create } from "react-test-renderer";

import PageIllustration from "./PageIllustration";

describe("PageIllustration Component", () => {
  test("renders the PageIllustration Component", () => {
    const tree = create(<PageIllustration src="some source" alt="some alt" />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});