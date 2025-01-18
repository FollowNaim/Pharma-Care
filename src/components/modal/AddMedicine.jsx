import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { uploadToImgbb } from "@/utils/uploadImage";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export function AddMedicine({ isOpen, setIsOpen, refetch }) {
  const [category, setCategory] = useState("Tablet");
  const [imageUrl, setImageUrl] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/categories");
      return data;
    },
  });
  const handlePhotoChange = async (e) => {
    const { url } = await toast.promise(uploadToImgbb(e), {
      loading: "Image Uploading...",
      success: <b>Image uploaded successfull!</b>,
      error: <b>Could not upload.</b>,
    });
    console.log(url);
    setImageUrl(url);
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const medicine = {
      ...data,
      image: imageUrl,
      price: parseFloat(data.price),
      discount: parseInt(data.discount || 0),
      category,
      seller: { name: user.displayName, email: user.email },
    };
    try {
      await toast.promise(axiosSecure.post("/medicines", medicine), {
        loading: "Adding medicine...",
        success: <b>Added successfull!</b>,
        error: <b>Could not add.</b>,
      });
      refetch();
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      setIsOpen(false);
      refetch();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Medicine</DialogTitle>
        </DialogHeader>
        <Form>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid gap-2">
                <Label htmlFor="name">Medicine Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Napa Extra"
                  required
                  {...register("name")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Generic Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Paracetemol"
                  required
                  {...register("genericName")}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="name">Mass Unit</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="500mg or 5ml"
                  required
                  {...register("dosage")}
                />
              </div>
              <div className="grid gap-2 flex-1 w-full">
                <Label htmlFor="role">Category</Label>
                <Select
                  onValueChange={(val) => setCategory(val)}
                  defaultValue="Tablet"
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid gap-2">
                <Label htmlFor="brand">Company Name</Label>
                <Input
                  id="brand"
                  type="text"
                  name="brand"
                  placeholder="ex. Beximco"
                  required
                  {...register("brand")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="50"
                  required
                  {...register("price")}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid gap-2">
                <Label htmlFor="image">Photo URL</Label>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  required
                  {...register("image", {
                    onChange: (e) => {
                      handlePhotoChange(e);
                    },
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">Discount (on %)</Label>
                <Input
                  id="discount"
                  type="number"
                  name="discount"
                  placeholder="100%"
                  {...register("discount")}
                />
              </div>
            </div>
            <div className="grid w-full gap-2 ">
              <Label htmlFor="price">Description</Label>
              <Textarea
                {...register("description")}
                className="resize-none"
                placeholder="Write Short Description"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
