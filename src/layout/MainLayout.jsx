import Footer from "@/common/footer/Footer";
import Navbar from "@/common/header/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="font-lato">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
