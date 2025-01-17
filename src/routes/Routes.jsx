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
import Advertisement from "@/pages/dashboard/seller/Advertisement";
import ManageMedicines from "@/pages/dashboard/seller/ManageMedicines";
import PaymentHistory from "@/pages/dashboard/seller/PaymentHistory";
import SellerHome from "@/pages/dashboard/seller/SellerHome";
import UsersPayment from "@/pages/dashboard/user/UsersPayment";
import Home from "@/pages/home/Home";
import Invoice from "@/pages/invoice/Invoice.jsx";
import Signin from "@/pages/login/Signin";
import Shop from "@/pages/shop/Shop";
import Signup from "@/pages/signup/Signup";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
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
        path: "/dashboard",
        element: (
          <PrivateRoutes protectedRules={["admin", "seller", "user"]}>
            <DashboardIndex />
          </PrivateRoutes>
        ),
      },
      {
        path: "admin",
        element: (
          <PrivateRoutes protectedRules={["admin"]}>
            <AdminHome />
          </PrivateRoutes>
        ),
      },
      {
        path: "seller",
        element: (
          <PrivateRoutes protectedRules={["seller"]}>
            <SellerHome />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage/medicines",
        element: (
          <PrivateRoutes protectedRules={["seller"]}>
            <ManageMedicines />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage/history/payments",
        element: (
          <PrivateRoutes protectedRules={["seller"]}>
            <PaymentHistory />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage/advertisements",
        element: (
          <PrivateRoutes protectedRules={["seller"]}>
            <Advertisement />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage/users",
        element: (
          <PrivateRoutes protectedRules={["admin"]}>
            <Users />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage/category",
        element: (
          <PrivateRoutes protectedRules={["admin"]}>
            <Category />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage/payments",
        element: (
          <PrivateRoutes protectedRules={["admin"]}>
            <Payments />
          </PrivateRoutes>
        ),
      },
      {
        path: "sales/report",
        element: (
          <PrivateRoutes protectedRules={["admin"]}>
            <SalesReport />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage/banners",
        element: (
          <PrivateRoutes protectedRules={["admin"]}>
            <ManageBanners />
          </PrivateRoutes>
        ),
      },
      {
        path: "manage/users/payments",
        element: (
          <PrivateRoutes protectedRules={["user"]}>
            <UsersPayment />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
