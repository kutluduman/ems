import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../../../store";
import EmployeeForm from "./EmployeeForm";

xdescribe("EmployeeForm Component", () => {
  test("renders the EmployeeForm Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <EmployeeForm
            open={true}
            setOpen={() => {}}
            setMessage={() => {}}
            setSnackbarOpen={() => {}}
          />
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});