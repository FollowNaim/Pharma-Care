import Modal from "@/components/modal/Modal";
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
import { CircleCheckBig, Eye } from "lucide-react";
import { useState } from "react";

function Shop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const { data: medicines = [] } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const data = await axios.get("/medicines");
      return data?.data;
    },
  });
  return (
    <div className="mb-10">
      <div className="container px-4">
        <Table>
          <TableCaption>A list of all medicines.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((medicine, i) => (
              <TableRow key={medicine._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.dosage}</TableCell>
                <TableCell>{medicine.category}</TableCell>
                <TableCell>{medicine.price}</TableCell>
                <TableCell>{medicine.stock}</TableCell>
                <TableCell>{medicine.brand}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-4 items-center">
                    <Eye
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                        setCurrentData(medicine);
                      }}
                      className="cursor-pointer"
                      size={18}
                    />
                    <CircleCheckBig className="cursor-pointer" size={18} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Modal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            medicine={currentData}
          />
        </Table>
      </div>
    </div>
  );
}

export default Shop;
