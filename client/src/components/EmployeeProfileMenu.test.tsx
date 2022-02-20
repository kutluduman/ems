import { create } from "react-test-renderer";

import EmployeeProfileMenu from "./EmployeeProfileMenu";

describe("EmployeeProfileMenu Component", () => {
  test("renders the EmployeeProfileMenu Component", () => {
    const tree = create(<EmployeeProfileMenu open={false} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});