import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardIndex() {
  const isAdmin = true;
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin) navigate("dashboard/admin");
  }, [isAdmin]);
  return null;
}

export default DashboardIndex;
