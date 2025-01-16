import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function useAxiosSecure() {
  const token = localStorage.getItem("token");
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log("caught on interceptor", error);
      if (error.status === 401 || error.status === 403) {
        toast.error(error.response.data);
        await logOut();
        navigate("/auth/signin");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
}

export default useAxiosSecure;
