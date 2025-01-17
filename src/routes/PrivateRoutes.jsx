import Spinner from "@/components/spinner/Spinner";
import { useAuth } from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

function PrivateRoutes({ children, protectedRules }) {
  const { role, roleLoading } = useRole();
  const { user, loading } = useAuth();
  console.log(role);
  if (loading) return <Spinner />;
  if (!user) return <Navigate to={"/auth/signin"} />;
  if (roleLoading && !role) return <Spinner />;
  if (!protectedRules.includes(role)) return <Navigate to={"/auth/signin"} />;
  return children;
}

export default PrivateRoutes;
