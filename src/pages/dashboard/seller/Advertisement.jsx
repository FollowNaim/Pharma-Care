import AddBanners from "@/components/modal/AddBanners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
function Advertisement() {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { data: advertisements = [], refetch } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/seller/advertisements/${user.email}`
      );
      return data;
    },
  });

  return (
    <div>
      <div className="container">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsOpen(!isOpen)}>
            <IoIosAddCircle /> Request for advertise
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {advertisements?.map((advertisement, i) => (
              <TableRow key={advertisement._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={advertisement.image}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{advertisement.medicineName}</TableCell>
                <TableCell>{advertisement.seller.email}</TableCell>
                <TableCell className="text-right flex justify-end">
                  {advertisement.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddBanners isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
      </div>
    </div>
  );
}

export default Advertisement;
