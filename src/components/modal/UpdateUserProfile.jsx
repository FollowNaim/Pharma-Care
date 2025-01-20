import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { uploadToImgbb } from "@/utils/uploadImage";
import { ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function UpdateUserProfile({ isOpen, setIsOpen }) {
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const profileRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { user, updateUserProfile: updateDP, setLoading } = useAuth();
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (user) {
      axiosSecure.get(`/user/${user?.email}`).then((res) => {
        reset(res.data);
        setDbUser(res.data);
      });
    }
  }, [user?.email]);
  const onSubmit = async (data) => {
    const Newuser = {
      name: data.name,
      photoURL: uploadedImage ? uploadedImage : dbUser.photoURL,
    };
    await toast.promise(
      updateDP(data.name, uploadedImage ? uploadedImage : dbUser.image),
      {
        loading: "Updating Profile...",
        success: <b>Updated successfull!</b>,
        error: <b>Could not update.</b>,
      }
    );
    await axiosSecure.put(`/user/${user?.email}`, Newuser);
    setLoading(false);
    setIsOpen(false);
    reset();
  };
  const handleUpload = async (e) => {
    const { url } = await toast.promise(uploadToImgbb(e), {
      loading: "Image Uploading...",
      success: <b>Image uploaded successfull!</b>,
      error: <b>Could not upload.</b>,
    });
    setUploadedImage(url);
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Your Profile</DialogTitle>
            <DialogDescription>
              Enter details to update your profile. You can always edit it
              later.
            </DialogDescription>
          </DialogHeader>
          <Form>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="image" className="text-center mb-3">
                  Upload Image
                </Label>
                <div className="flex justify-center items-center">
                  <Input
                    onChange={handleUpload}
                    ref={profileRef}
                    type="file"
                    className="hidden"
                  />
                  {uploadedImage && (
                    <img
                      onClick={() => profileRef.current.click()}
                      className="w-32 h-32 rounded-md border-2 border-dashed p-4 object-cover"
                      src={uploadedImage}
                      alt=""
                    />
                  )}
                  {!uploadedImage && (
                    <div
                      className="border-dashed border-2 p-8"
                      onClick={() => profileRef.current.click()}
                    >
                      <ImageUp size={28} />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  {...register("name")}
                />
              </div>

              <div className="flex justify-end">
                <Button>Update Profile</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateUserProfile;
