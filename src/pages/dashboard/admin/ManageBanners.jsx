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

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function ManageBanners() {
  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axios.get("/banners");
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
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Seller Name</TableHead>
              <TableHead>Seller Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners?.map((banner, i) => (
              <TableRow key={banner._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{banner.medicineName}</TableCell>
                <TableCell>{banner.description.slice(0, 22)}...</TableCell>
                <TableCell>{banner.seller.name}</TableCell>
                <TableCell>{banner.seller.email}</TableCell>
                <TableCell className="text-right flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {banner.status === "added" ? (
                        <Button>Remove Slide</Button>
                      ) : (
                        <Button variant="outline">Add Slide</Button>
                      )}
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

export default ManageBanners;
