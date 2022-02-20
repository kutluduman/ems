import { create } from "react-test-renderer";

import EmployeeActionMenu from "./EmployeeActionMenu";

describe("EmployeeActionMenu Component", () => {
  test("renders the EmployeeActionMenu Component", () => {
    const tree = create(
      <EmployeeActionMenu handleEdit={() => {}} handleDelete={() => {}} />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});