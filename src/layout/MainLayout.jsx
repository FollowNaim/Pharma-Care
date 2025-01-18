import Footer from "@/common/footer/Footer";
import Navbar from "@/common/header/Header";
import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";

function MainLayout() {
  return (
    <div className="font-lato">
      <ScrollRestoration />
      <Toaster />
      <Navbar />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
