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
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaDownload } from "react-icons/fa6";
function UsersPayment() {
  const tableRef = useRef(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments-history"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/payments/${user.email}`);
      return data;
    },
  });
  if (isLoading) return <Spinner />;
  return (
    <div>
      <Seo title={"Payment History | Pharma Care"} />
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
          <TableCaption>A list of your payments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Consumer</TableHead>
              <TableHead>Transaction Id</TableHead>
              <TableHead>Total Quantity</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead className="">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((payment, i) => {
              const medicine = payment;
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{medicine?.name}</TableCell>
                  <TableCell>{medicine?.email}</TableCell>
                  <TableCell>{medicine?.transactionId}</TableCell>
                  <TableCell>{medicine?.totalQuantity}</TableCell>
                  <TableCell>{medicine?.totalPrice}</TableCell>
                  <TableCell className="">
                    {medicine?.status === "requested" ? "Pending" : "Paid"}
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

export default UsersPayment;
