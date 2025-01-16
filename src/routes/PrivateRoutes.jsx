import { useAuth } from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

function PrivateRoutes({ children, protectedRules }) {
  const { role, roleLoading } = useRole();
  const { user, loading } = useAuth();
  if (loading) return <p>Loading....</p>;
  if (!user) return <Navigate to={"/auth/signin"} />;
  if (roleLoading) return <p>Loading...</p>;
  if (!protectedRules.includes(role)) return <Navigate to={"/auth/signin"} />;
  return children;
}

export default PrivateRoutes;
