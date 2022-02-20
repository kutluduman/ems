import { create } from "react-test-renderer";

import ThemeConfig from "../theme";
import HideForWidth, { Width } from "./HideForWidth";

describe("HideForWidth Component", () => {
  test("renders the HideForWidth Component", () => {
    const tree = create(
      <ThemeConfig>
        <HideForWidth width={Width.lgDown}>
          <h1>Some Content</h1>
        </HideForWidth>
      </ThemeConfig>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});