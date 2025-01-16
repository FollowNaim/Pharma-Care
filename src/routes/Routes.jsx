import DashboardLayout from "@/layout/DashboardLayout";
import MainLayout from "@/layout/MainLayout";
import Cart from "@/pages/cart/Cart";
import Checkout from "@/pages/checkout/Checkout";
import Category from "@/pages/dashboard/admin/Category";
import AdminHome from "@/pages/dashboard/admin/Home";
import ManageBanners from "@/pages/dashboard/admin/ManageBanners";
import Payments from "@/pages/dashboard/admin/Payments";
import SalesReport from "@/pages/dashboard/admin/SalesReport";
import Users from "@/pages/dashboard/admin/Users";
import DashboardIndex from "@/pages/dashboard/DashboardIndex";
import ManageMedicines from "@/pages/dashboard/seller/ManageMedicines";
import PaymentHistory from "@/pages/dashboard/seller/PaymentHistory";
import SellerHome from "@/pages/dashboard/seller/SellerHome";
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
        element: <DashboardIndex />,
      },
      {
        path: "admin",
        element: <AdminHome />,
      },
      {
        path: "seller",
        element: <SellerHome />,
      },
      {
        path: "manage/medicines",
        element: <ManageMedicines />,
      },
      {
        path: "manage/history/payments",
        element: <PaymentHistory />,
      },
      {
        path: "manage/users",
        element: <Users />,
      },
      {
        path: "manage/category",
        element: <Category />,
      },
      {
        path: "manage/payments",
        element: <Payments />,
      },
      {
        path: "sales/report",
        element: <SalesReport />,
      },
      {
        path: "manage/banners",
        element: <ManageBanners />,
      },
    ],
  },
]);
