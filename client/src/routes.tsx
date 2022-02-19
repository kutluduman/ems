import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Employees from "./pages/Employees";
import NotFound from "./pages/Page404";
import { useAppSelector } from "./store/hooks";
import { initDataIfAuthenticated, selectToken } from "./store/slices/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Router = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(initDataIfAuthenticated());
    }
  }, [token]);

  return useRoutes([
    {
      path: "/dashboard",
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/employees" replace /> },
        { path: "employees", element: <Employees /> },
      ],
    },
    {
      path: "/",
      element: token ? (
        <Navigate to="/dashboard/employees" replace />
      ) : (
        <LogoOnlyLayout />
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

export default Router;