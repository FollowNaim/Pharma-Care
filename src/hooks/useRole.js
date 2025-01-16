import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useRole() {
  const [role, setRole] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const { data } = await axiosSecure.get(`/user-role/${user?.email}`);
        setRole(data.role);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      fetchRole();
    }
  }, [user]);
  return role;
}

export default useRole;
