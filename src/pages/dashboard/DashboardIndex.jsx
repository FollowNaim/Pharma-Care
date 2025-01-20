import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { useNavigate } from "react-router-dom";

function DashboardIndex() {
  const navigate = useNavigate();
  const { role, roleLoading } = useRole();
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return navigate("/auth/signin");
  if (role === "admin") return navigate("/dashboard/admin");
  if (role === "seller") return navigate("/dashboard/seller");
  if (role === "user") return navigate("/dashboard/manage/users/payments");
  return null;
}

export default DashboardIndex;
