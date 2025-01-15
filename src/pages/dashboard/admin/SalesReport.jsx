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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaDownload } from "react-icons/fa6";
function SalesReport() {
  const tableRef = useRef(null);
  const { user } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axios.get("/sales-report");
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
              <TableHead>Seller</TableHead>
              <TableHead>Transaction Id</TableHead>
              <TableHead className="">Unit Price</TableHead>
              <TableHead className="">Quantity</TableHead>
              <TableHead className="">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments[0].medicines.map((payment, i) => (
              <TableRow key={payment._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{payment?.consumer?.name}</TableCell>
                <TableCell>{payment?.consumer?.email}</TableCell>
                <TableCell>{payment?.seller?.email}</TableCell>
                <TableCell>{payment?.transactionId}</TableCell>
                <TableCell>{payment?.perUnitPrice}</TableCell>
                <TableCell>{payment?.quantity}</TableCell>
                <TableCell className="">${payment?.IndividualTotal}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Grand Total</TableCell>
              <TableCell>${payments[0].totalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SalesReport;
