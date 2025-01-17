import { AddMedicine } from "@/components/modal/AddMedicine";
import Spinner from "@/components/spinner/Spinner";
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
function ManageMedicines() {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: medicines = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["medicines", user],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/seller/medicines/email=${user.email}`
      );
      return data;
    },
  });
  if (isLoading) return <Spinner />;
  return (
    <div>
      <div className="container">
        <div className="flex justify-end mb-4">
          <Button
            className="flex items-center gap-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoIosAddCircle /> Add Medicine
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your recent payments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Generic Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="">Dosage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((medicine, i) => (
              <TableRow key={medicine._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>

                <TableCell>
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      src={medicine.image}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{medicine?.name}</TableCell>
                <TableCell>{medicine?.genericName}</TableCell>
                <TableCell>{medicine?.brand}</TableCell>
                <TableCell>{medicine?.price}</TableCell>

                <TableCell>{medicine?.category}</TableCell>
                <TableCell>{medicine?.dosage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddMedicine isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
      </div>
    </div>
  );
}

export default ManageMedicines;
