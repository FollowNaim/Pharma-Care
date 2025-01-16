import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

function UpdateCategories({ isOpen, setIsOpen, refetch, categoryId }) {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      image: "",
      description: "",
    },
  });
  useEffect(() => {
    axiosSecure.get(`/categories?id=${categoryId}`).then((res) => {
      reset(res.data[0]);
    });
  }, [categoryId]);
  const onSubmit = async (data) => {
    await toast.promise(axiosSecure.put(`/categories/${categoryId}`, data), {
      loading: "Updating category...",
      success: <b>Updated successfull!</b>,
      error: <b>Could not update.</b>,
    });
    setIsOpen(false);
    refetch();
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
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
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Tablet"
                  required
                  {...register("name")}
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

export default UpdateCategories;
