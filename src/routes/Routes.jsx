import MainLayout from "@/layout/MainLayout";
import Cart from "@/pages/cart/Cart";
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
        path: "cart",
        element: <Cart />,
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
]);
