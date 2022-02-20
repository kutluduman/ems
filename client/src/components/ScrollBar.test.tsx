import { create } from "react-test-renderer";

import ScrollBar from "./ScrollBar";

describe("ScrollBar Component", () => {
  test("renders the ScrollBar Component", () => {
    const tree = create(
      <ScrollBar title="ScrollBar Title">
        <h1>Employee</h1>
      </ScrollBar>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});