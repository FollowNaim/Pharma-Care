import Modal from "@/components/modal/Modal";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronsUpDown, CircleCheckBig, Eye } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import { useParams } from "react-router-dom";

function Shop() {
  const { category } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desc, setDesc] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentData, setCurrentData] = useState({});
  const { data: medicinesCount = {} } = useQuery({
    queryKey: ["medicines-count"],
    queryFn: async () => {
      const data = await axios.get("/medicines-count");
      return data?.data;
    },
  });
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines", currentPage, desc, searchText],
    queryFn: async () => {
      const data = await axios.get(
        `/medicines?page=${currentPage}&size=${size}&desc=${desc}&search=${searchText}&category=${
          category ? category : ""
        }`
      );
      return data?.data;
    },
  });
  const size = 10;
  const totalMedicines = medicinesCount?.count;
  let totalPages = totalMedicines && Math.ceil(totalMedicines / size);
  if (searchText) {
    totalPages = Math.ceil(medicines.length / size);
  }
  console.log(totalPages, totalMedicines, currentPage);
  const handleAddToCart = (medicine) => {
    if (!user) return toast.error("You must login before add to cart");
    const { name, image, price, manufacturer, seller } = medicine;
    const cartItem = {
      medicineId: medicine._id,
      customer: {
        email: user.email,
        name,
      },
      seller,
      image,
      price,
      quantity: 1,
      manufacturer,
    };
    toast.promise(axiosSecure.post("/carts", cartItem), {
      loading: "Adding to cart...",
      success: <b>Added successfull!</b>,
      error: <b>Could not added.</b>,
    });
  };
  return (
    <div className="mb-10">
      <div className="container px-4">
        <div className="my-4 flex justify-between items-center">
          <div className="relative">
            {/* <Label htmlFor="role">Language</Label> */}
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              name="search"
              type="text"
              placeholder="Search Name..."
            />
            <IoIosSearch color="#737373" className="absolute top-3 right-2" />
          </div>
          <Button onClick={() => setDesc(!desc)} variant="outline">
            <ChevronsUpDown /> Price
          </Button>
        </div>
        <Table>
          {/* <TableCaption>A list of all medicines.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>

              <TableHead>Brand</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableCell colSpan="7">
                <Spinner />
              </TableCell>
            ) : (
              <>
                {medicines.map((medicine, i) => (
                  <TableRow key={medicine._id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.dosage}</TableCell>
                    <TableCell>{medicine.category}</TableCell>
                    <TableCell>{medicine.price}</TableCell>
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
                        <CircleCheckBig
                          onClick={() => handleAddToCart(medicine)}
                          className="cursor-pointer"
                          size={18}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
          <Modal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            medicine={currentData}
          />
        </Table>
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={"cursor-pointer"}
                  onClick={() => {
                    if (currentPage > 0) {
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                />
              </PaginationItem>
              {[...Array(totalPages).keys()].map((item, i) => (
                <PaginationItem
                  className={`${
                    item === currentPage ? "border rounded-md" : ""
                  }`}
                  key={i}
                >
                  <PaginationLink
                    className={"cursor-pointer"}
                    onClick={() => setCurrentPage(item)}
                  >
                    {item + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {/* <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem> */}
              <PaginationItem>
                <PaginationNext
                  className={"cursor-pointer"}
                  disabled={currentPage > totalPages}
                  onClick={() => {
                    if (currentPage < totalPages - 1) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Shop;
