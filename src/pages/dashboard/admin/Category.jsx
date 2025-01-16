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
import { Ellipsis } from "lucide-react";
function Category() {
  const axiosSecure = useAxiosSecure();
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/categories");
      return data;
    },
  });
  return (
    <div>
      <div className="container">
        <div className="flex justify-end mb-4">
          <Button>Add new category</Button>
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
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4">
                      <DropdownMenuLabel>Manage Categories</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Update Category</DropdownMenuItem>
                      <DropdownMenuItem>Delete Category</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Category;
