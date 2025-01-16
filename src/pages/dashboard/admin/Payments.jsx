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
function Payments() {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments");
      return data;
    },
  });
  return (
    <div>
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
                        <Button>Accept</Button>
                        <Button variant="outline">Reject</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline">
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
