import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/home/Home";
import Signin from "@/pages/login/Signin";
import Signup from "@/pages/signup/Signup";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "auth/signin",
        element: <Signin />,
      },
      {
        path: "auth/signup",
        element: <Signup />,
      },
    ],
  },
]);
