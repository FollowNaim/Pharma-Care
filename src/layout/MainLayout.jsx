import Footer from "@/common/footer/Footer";
import Navbar from "@/common/header/Header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const { data: medicine = [] } = useQuery({
    queryKey: ["medicines"],
    queryFn: () => {
      const { data } = axios.get("/medicine.json");
      return data;
    },
  });
  console.log(medicine);
  return (
    <div className="font-lato">
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
