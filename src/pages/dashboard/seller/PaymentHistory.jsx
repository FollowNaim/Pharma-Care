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
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaDownload } from "react-icons/fa6";
function PaymentHistory() {
  const tableRef = useRef(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments-history"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/seller/payments/${user.email}`);
      return data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="container">
        <div className="flex justify-end mb-4">
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <Button className="flex items-center gap-2">
              <FaDownload /> Export excel
            </Button>
          </DownloadTableExcel>
        </div>
        <Table ref={tableRef}>
          <TableCaption>A list of your recent payments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">ID</TableHead>

              <TableHead>Name</TableHead>
              <TableHead>Consumer</TableHead>
              <TableHead>Sold By</TableHead>
              <TableHead>Transaction Id</TableHead>
              <TableHead className="">Unit Price</TableHead>
              <TableHead className="">Quantity</TableHead>
              <TableHead className="">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments[0]?.orders.map((payment, i) => {
              const medicine = payment.medicine;
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{medicine?.consumer?.name}</TableCell>
                  <TableCell>{medicine?.consumer?.email}</TableCell>
                  <TableCell>{medicine?.seller?.email}</TableCell>
                  <TableCell>{medicine?.transactionId}</TableCell>
                  <TableCell>{medicine?.unitPrice}</TableCell>
                  <TableCell>{medicine?.quantity}</TableCell>
                  <TableCell className="">
                    {medicine.status === "requested" ? "Pending" : "Paid"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default PaymentHistory;
