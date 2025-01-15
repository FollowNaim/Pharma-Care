import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function Payments() {
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axios.get("/payments");
      return data;
    },
  });
  return (
    <div>
      <div className="container">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>

              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Transaction Id</TableHead>
              <TableHead className="text-right">Total Amout</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((payment, i) => (
              <TableRow key={payment._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.email}</TableCell>
                <TableCell>{payment.transactionId}</TableCell>
                <TableCell className="text-right">
                  ${payment.totalPrice}
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
