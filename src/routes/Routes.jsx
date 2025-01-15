import DashboardLayout from "@/layout/DashboardLayout";
import MainLayout from "@/layout/MainLayout";
import Cart from "@/pages/cart/Cart";
import Checkout from "@/pages/checkout/Checkout";
import AdminHome from "@/pages/dashboard/admin/Home";
import Home from "@/pages/home/Home";
import Invoice from "@/pages/invoice/Invoice.jsx";
import Signin from "@/pages/login/Signin";
import Shop from "@/pages/shop/Shop";
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
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/cart",
        element: <Cart />,
      },
      {
        path: "cart/checkout",
        element: <Checkout />,
      },
      {
        path: "auth/signin",
        element: <Signin />,
      },
      {
        path: "invoice/:invoiceId",
        element: <Invoice />,
      },
      {
        path: "auth/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
    ],
  },
]);
