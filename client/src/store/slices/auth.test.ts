import { AsyncStatus } from "../common";
import { AuthState } from "../../models/auth";
import authReducer, { logout, toggleRememberMe } from "./auth";

describe("Auth Reducer", () => {
  const initialState: AuthState = {
    status: AsyncStatus.IDLE,
    rememberMe: true,
  };

  describe("sync actions", () => {
    test("should handle initial state", () => {
      expect(authReducer(undefined, { type: "unknown" })).toEqual({
        status: AsyncStatus.IDLE,
        rememberMe: true,
        token: null,
      });
    });

    test("should handle toggleRememberMe", () => {
      let actual = authReducer(initialState, toggleRememberMe());
      expect(actual.rememberMe).toBeFalsy();
    });

    test("should handle logout", () => {
      const actual = authReducer(initialState, logout());
      expect(actual.token).toBeFalsy();
      expect(actual.employee).toBeFalsy();
      expect(actual.error).toBeFalsy();
    });
  });
});