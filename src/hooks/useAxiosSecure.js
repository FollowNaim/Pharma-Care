import axios from "axios";

function useAxiosSecure() {
  const token = localStorage.getItem("token");
  const axiosSecure = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });
  return axiosSecure;
}

export default useAxiosSecure;
