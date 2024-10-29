import App from "../App";
import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Auth/login/Login";
import NotFound from "../NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";

import VerifyOTP from "../pages/Auth/VerifyOTP/VerifyOTP";
import SignUp from "../pages/Auth/SignUp/SignUp";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import Admin from "../pages/Auth/admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />
      },
      {
        path: "reset-password/:email",
        element: <ResetPassword />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "verify/:email",
        element: <VerifyOTP />
      },
      {
        path: "admin",
        element: <Admin />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
