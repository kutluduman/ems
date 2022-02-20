import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  initDataIfAuthenticated,
  selectError,
  selectToken,
} from "./store/slices/auth";
import { useAppSelector } from "./store/hooks";
import DashboardLayout from "./layouts/dashboard";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Register from "./pages/Register";

const Router = () => {
  const token = useAppSelector(selectToken);
  const error = useAppSelector(selectError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(initDataIfAuthenticated());
    }
    if (error === "Token is not valid") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, error]);

  return useRoutes([
    {
      path: "/dashboard",
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [{ path: "", element: <Employees /> }],
    },
    {
      path: "/",
      element:
        token && error !== "Token is not valid" ? (
          <Navigate to="/dashboard" replace />
        ) : (
          <LogoOnlyLayout />
        ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Navigate to="/login" /> },
      ],
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ]);
}
export default Router;