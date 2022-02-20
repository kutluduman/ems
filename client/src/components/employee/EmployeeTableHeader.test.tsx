import { create } from "react-test-renderer";

import EmployeeTableHeader, { Order } from "./EmployeeTableHeader";

describe("EmployeeTableHeader Component", () => {
  test("renders the EmployeeTableHeader Component", () => {
    const tree = create(
      <EmployeeTableHeader
        order={Order.asc}
        orderBy="name"
        rowCount={5}
        headLabel={[]}
        numSelected={10}
        onRequestSort={(event: any, property: string) => {}}
        onSelectAllClick={(
          event: React.ChangeEvent<HTMLInputElement>,
          checked: boolean
        ) => {}}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});