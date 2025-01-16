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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
function ManageMedicines() {
  const { user } = useAuth();
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines", user],
    queryFn: async () => {
      const { data } = await axios.get(`/medicines?email=${user.email}`);
      return data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="container">
        <div className="flex justify-end mb-4">
          <Button className="flex items-center gap-2">
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
              <TableHead>Brand</TableHead>
              <TableHead>price</TableHead>
              <TableHead>Stock</TableHead>
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
                <TableCell>{medicine?.brand}</TableCell>
                <TableCell>{medicine?.price}</TableCell>
                <TableCell>{medicine?.stock}</TableCell>
                <TableCell>{medicine?.category}</TableCell>
                <TableCell>{medicine?.dosage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ManageMedicines;
