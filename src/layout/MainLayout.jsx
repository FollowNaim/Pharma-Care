import Navbar from "@/common/header/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="font-lato">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
