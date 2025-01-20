import Seo from "@/components/seo/Seo";
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
import useAxiosSecure from "@/hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
function ManageBanners() {
  const axiosSecure = useAxiosSecure();
  const {
    data: banners = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/banners");
      return data;
    },
  });
  const handleBannerAdd = async (id) => {
    await toast.promise(
      axiosSecure.patch(`/banners/${id}`, { status: "added" }),
      {
        loading: "Updating status...",
        success: <b>Updated successfull!</b>,
        error: <b>Could not update.</b>,
      }
    );
    refetch();
  };
  const handleBannerRemove = async (id) => {
    await toast.promise(
      axiosSecure.patch(`/banners/${id}`, { status: "removed" }),
      {
        loading: "Updating status...",
        success: <b>Updated successfull!</b>,
        error: <b>Could not update.</b>,
      }
    );
    refetch();
  };
  if (isLoading) return <Spinner />;
  return (
    <div>
      <Seo title={"Manage Banners | Pharma Care"} />
      <div className="container">
        <div className="flex justify-end mb-4">
          <Button>Add new banner</Button>
        </div>
        <Table>
          <TableCaption>A list of all Banners.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Seller Name</TableHead>
              <TableHead>Seller Email</TableHead>
              <TableHead>Banner Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners?.map((banner, i) => (
              <TableRow key={banner._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>

                <TableCell>
                  <Avatar>
                    <AvatarImage src={banner.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{banner.medicineName}</TableCell>
                <TableCell>{banner.description.slice(0, 22)}...</TableCell>
                <TableCell>{banner.seller.name}</TableCell>
                <TableCell>{banner.seller.email}</TableCell>
                <TableCell>{banner.status}</TableCell>
                <TableCell className="text-right flex justify-end">
                  {banner.status === "added" ? (
                    <Button onClick={() => handleBannerRemove(banner._id)}>
                      Remove Slide
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleBannerAdd(banner._id)}
                    >
                      Add Slide
                    </Button>
                  )}
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
