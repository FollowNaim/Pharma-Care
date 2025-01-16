import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useRole() {
  const [roleLoading, setRoleLoading] = useState(true);
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
      } finally {
        setRoleLoading(false);
      }
    };
    if (user) {
      fetchRole();
    }
  }, [user]);
  return { role, roleLoading };
}

export default useRole;
