import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../../../store";
import EmployeesListToolbar from "./EmployeesListToolbar";

describe("EmployeesListToolbar Component", () => {
  test("renders the EmployeesListToolbar Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <EmployeesListToolbar
            numSelected={10}
            filterName={"filterName"}
            handleMultipleUsersDelete={() => {}}
            onFilterName={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {}}
          />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});