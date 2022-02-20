import { create } from "react-test-renderer";

import EmployeeTableToolbar from "./EmployeeTableToolbar";

describe("EmployeeTableToolbar Component", () => {
  test("renders the EmployeeTableToolbar Component", () => {
    const tree = create(
      <EmployeeTableToolbar
        numSelected={10}
        filterName={"filterName"}
        handleMultipleUsersDelete={() => {}}
        onFilterName={(
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});