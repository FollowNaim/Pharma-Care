import AddCategories from "@/components/modal/AddCategories";
import UpdateCategories from "@/components/modal/UpdateCategories";
import Spinner from "@/components/spinner/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Swal from "sweetalert2";
function Category() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const axiosSecure = useAxiosSecure();
  const {
    data: categories = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/categories");
      return data;
    },
  });
  const handleCategoryDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/categories/${id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleCategoryUpdate = (id) => {
    setCategoryId(id);
    setCatOpen(!catOpen);
  };
  if (isLoading) return <Spinner />;
  return (
    <div>
      <div className="container">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setOpen(!open)}>
            <IoMdAddCircle />
            Add new category
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category, i) => (
              <TableRow key={category._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      src={category.image}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className="text-right flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MdOutlineMoreHoriz size={22} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4">
                      <DropdownMenuLabel>Manage Categories</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleCategoryUpdate(category._id)}
                      >
                        Update Category
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleCategoryDelete(category._id)}
                      >
                        Delete Category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddCategories isOpen={open} setIsOpen={setOpen} refetch={refetch} />
        <UpdateCategories
          categoryId={categoryId}
          isOpen={catOpen}
          setIsOpen={setCatOpen}
          refetch={refetch}
        />
      </div>
    </div>
  );
}

export default Category;
