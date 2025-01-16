import { useAuth } from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { useNavigate } from "react-router-dom";

function DashboardIndex() {
  const navigate = useNavigate();
  const { role } = useRole();
  const { user, loading } = useAuth();
  console.log(user);
  if (loading) return <p>Loading...</p>;
  if (!user) return navigate("/auth/signin");
  if (role === "admin") navigate("/dashboard/admin");
  if (role === "seller") navigate("/dashboard/seller");

  return null;
}

export default DashboardIndex;
