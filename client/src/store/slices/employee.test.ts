import { AsyncStatus } from "../common";
import employeeReducer, {
  EmployeeState,
  setEmployeeInQuestion,
} from "./employee";

describe("Employee Reducer", () => {
  const initialState: EmployeeState = {
    status: AsyncStatus.IDLE,
    employees: [],
  };

  describe("sync actions", () => {
    test("should handle initial state", () => {
      expect(employeeReducer(undefined, { type: "unknown" })).toEqual({
        status: AsyncStatus.IDLE,
        employees: [],
      });
    });

    test("should handle setEmployeeInQuestion", () => {
      const employeeToSet = { name: "John" };
      let actual = employeeReducer(
        initialState,
        setEmployeeInQuestion({ employee: employeeToSet })
      );
      expect(actual.employee).toEqual(employeeToSet);
    });
  });
});