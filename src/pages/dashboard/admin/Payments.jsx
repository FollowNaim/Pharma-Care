import Seo from "@/components/seo/Seo";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
function Payments() {
  const axiosSecure = useAxiosSecure();
  const {
    data: payments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments");
      return data;
    },
  });
  const handleAccept = async (id) => {
    await toast.promise(
      axiosSecure.patch(`/payments/${id}`, { status: "paid" }),
      {
        loading: "Updating payment status...",
        success: <b>Updated status successfull!</b>,
        error: <b>Could not updated.</b>,
      }
    );
    refetch();
  };
  const handleReject = async (id) => {
    await toast.promise(
      axiosSecure.patch(`/payments/${id}`, { status: "rejected" }),
      {
        loading: "Updating payment status...",
        success: <b>Updated status successfull!</b>,
        error: <b>Could not updated.</b>,
      }
    );
    refetch();
  };
  if (isLoading) return <Spinner />;
  return (
    <div>
      <Seo title={"Manage Payments | Pharma Care"} />
      <div className="container">
        <Table>
          <TableCaption>A list of your recent payments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Transaction Id</TableHead>
              <TableHead className="">Total Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((payment, i) => (
              <TableRow key={payment._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.email}</TableCell>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell className="">${payment.totalPrice}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-3">
                    {payment.status === "requested" ? (
                      <>
                        <Button onClick={() => handleAccept(payment._id)}>
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleReject(payment._id)}
                          variant="outline"
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled={payment.status === "rejected"}
                          variant="outline"
                          className={`${
                            payment.status === "rejected" ? "bg-red-100" : ""
                          }`}
                        >
                          {payment.status === "paid" ? "Accepted" : "Rejected"}
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Payments;
