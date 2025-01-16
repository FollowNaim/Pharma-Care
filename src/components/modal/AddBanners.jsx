import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

function AddBanners({ isOpen, setIsOpen, refetch }) {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const onSubmit = async (data) => {
    const medicineBanner = {
      ...data,
      seller: { name: user.displayName, email: user.email },
    };
    await toast.promise(axiosSecure.post("/banners", medicineBanner), {
      loading: "Requesting for ad...",
      success: <b>Requested successfull!</b>,
      error: <b>Could not requested.</b>,
    });
    setIsOpen(false);
    refetch();
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Banner AD</DialogTitle>
            <DialogDescription>
              Enter details to create a new category. You can always edit or
              delete it later.
            </DialogDescription>
          </DialogHeader>
          <Form>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="name">Medicine Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Napa Extend"
                  required
                  {...register("medicineName")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.png"
                  required
                  {...register("image")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Enter short description related to category"
                  className="resize-none"
                  {...register("description")}
                />
              </div>
              <div className="flex justify-end">
                <Button>Add Category</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddBanners;
