import { create } from "react-test-renderer";

import Logo from "./Logo";

describe("Logo Component", () => {
  test("renders the Logo Component", () => {
    const tree = create(<Logo />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});