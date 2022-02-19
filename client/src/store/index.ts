import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import employee from "./slices/employee";

export const store = configureStore({
  reducer: {
    auth,
    employee,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
