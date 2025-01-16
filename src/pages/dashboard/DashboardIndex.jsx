import useRole from "@/hooks/useRole";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardIndex() {
  const navigate = useNavigate();
  const role = useRole();
  useEffect(() => {
    if (role === "admin") navigate("/dashboard/admin");
    if (role === "seller") navigate("/dashboard/seller");
  }, [role]);
  return null;
}

export default DashboardIndex;
