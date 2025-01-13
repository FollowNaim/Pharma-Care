import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
