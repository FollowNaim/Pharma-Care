import Footer from "@/common/footer/Footer";
import Navbar from "@/common/header/Header";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="font-lato">
      <Toaster />
      <Navbar />
      <div className="min-h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
