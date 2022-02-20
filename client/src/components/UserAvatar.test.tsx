import { create } from "react-test-renderer";

import UserAvatar from "./UserAvatar";

describe("UserAvatar Component", () => {
  test("renders the UserAvatar Component", () => {
    const tree = create(<UserAvatar name="John" surname="Doe" />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});