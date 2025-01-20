import Seo from "@/components/seo/Seo";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "lucide-react";
import { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaDownload } from "react-icons/fa6";
function SalesReport() {
  const axiosSecure = useAxiosSecure();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const tableRef = useRef(null);
  const { user } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", fromDate, toDate],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/sales-report?fromDate=${
          fromDate ? new Date(fromDate) : null
        }&toDate=${toDate ? new Date(toDate) : null}`
      );
      return data;
    },
  });
  if (isLoading) return <Spinner />;
  return (
    <div>
      <div className="container">
        <Seo title={"Sales Report | Pharma Care"} />
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-4 mr-4">
            <div className="flex items-center gap-2">
              <p>From</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {fromDate ? (
                      new Date(fromDate).toLocaleDateString("en-CA")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-2">
              <p>To</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {toDate ? (
                      new Date(toDate).toDateString()
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
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
              <TableHead>Order Date</TableHead>
              <TableHead className="">Unit Price</TableHead>
              <TableHead className="">Quantity</TableHead>
              <TableHead className="">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments[0]?.medicines.map((payment, i) => (
              <TableRow key={payment._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{payment?.consumer?.name}</TableCell>
                <TableCell>{payment?.consumer?.email}</TableCell>
                <TableCell>{payment?.seller?.email}</TableCell>
                <TableCell>
                  {payment?.transactionId.substring(0, 8)}...
                </TableCell>
                <TableCell>
                  {new Date(payment.orderDate).toISOString().split("T")[0]}
                </TableCell>
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
              <TableCell></TableCell>
              <TableCell>Grand Total</TableCell>
              <TableCell>${payments[0]?.totalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SalesReport;
