import logo1 from "@/assets/logo/logo.png";
import man from "@/assets/signin/man2.png";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { uploadToImgbb } from "@/utils/uploadImage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { register, handleSubmit } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("user");
  const { user, signinGoogle, signUp, updateUserProfile } = useAuth();
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);
  const handleGoogle = async () => {
    const { user } = await signinGoogle();
    const { displayName, email, photoURL } = user;
    await toast.promise(
      axios.post("/user", {
        user: { name: displayName, email, photoURL },
      }),
      {
        loading: "Signin...",
        success: <b>Signin successfull!</b>,
        error: <b>Could not signin.</b>,
      }
    );
    navigate("/");
  };
  const handlePhotoChange = async (e) => {
    const { url } = await toast.promise(uploadToImgbb(e), {
      loading: "Image Uploading...",
      success: <b>Image uploaded successfull!</b>,
      error: <b>Could not upload.</b>,
    });
    setImageUrl(url);
  };
  const onSubmit = async (data) => {
    const { email, name, photo, password, role } = data || {};
    try {
      await toast.promise(signUp(email, password), {
        loading: "Creating account...",
        success: <b>Signed up successfull!</b>,
        error: <b>Could not signup.</b>,
      });
      await updateUserProfile(name, imageUrl);
      await axios.post("/user", {
        user: { name, email, photoURL: imageUrl, role: userRole },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Seo title={"SignUp | Pharma Care"} />
      <div className="container pl-4">
        <div className="flex items-center justify-center">
          <div className="w-full h-full grid lg:grid-cols-2">
            <div className="max-w-xs m-auto w-full flex flex-col items-center py-10">
              <h2 className="flex items-center gap-2">
                <img className="size-8" src={logo1} alt="" />{" "}
                <p className="font-bold text-xl">Pharma Care</p>
              </h2>
              <p className="mt-4 text-xl font-bold tracking-tight">
                Register to Pharma Care
              </p>
              <Button className="mt-8 w-full gap-3" onClick={handleGoogle}>
                <GoogleLogo />
                Continue with Google
              </Button>
              <div className="my-7 w-full flex items-center justify-center overflow-hidden">
                <Separator />
                <span className="text-sm px-2">OR</span>
                <Separator />
              </div>
              <Form>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      required
                      {...register("name")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                      {...register("email")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="photo">Profile Photo</Label>
                    <Input
                      id="photo"
                      type="file"
                      name="photo"
                      {...register("photo", {
                        onChange: (e) => {
                          handlePhotoChange(e);
                        },
                      })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="role">Your role</Label>
                    <Select
                      defaultValue="user"
                      onValueChange={(val) => setUserRole(val)}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      placeholder="Password"
                      name="password"
                      id="password"
                      type="password"
                      required
                      {...register("password")}
                    />
                  </div>
                  <Button type="submit" className="mt-4 w-full">
                    Continue with Email
                  </Button>
                </form>
              </Form>
              <div className="mt-5 space-y-5">
                <p className="text-sm text-center">
                  Already have an account?
                  <Link
                    to={"/auth/signin"}
                    className="ml-1 underline text-muted-foreground"
                  >
                    Signin
                  </Link>
                </p>
              </div>
            </div>
            <div className="bg-muted hidden lg:flex justify-end items-center">
              <div>
                <img className="w-60 mx-auto " src={man} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const GoogleLogo = () => (
  <svg
    width="1.2em"
    height="1.2em"
    id="icon-google"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block shrink-0 align-sub text-[inherit] size-lg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
        fill="#4285F4"
      ></path>
      <path
        d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
        fill="#34A853"
      ></path>
      <path
        d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
        fill="#FBBC04"
      ></path>
      <path
        d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
        fill="#EA4335"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="15.6825" height="16" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);

export default Signup;
