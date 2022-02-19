import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../../../store";
import EmployeesListHead, { Order } from "./EmployeesListHead";

describe("EmployeesListHead Component", () => {
  test("renders the EmployeesListHead Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <EmployeesListHead
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
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});