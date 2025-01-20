import logo1 from "@/assets/logo/logo.png";
import Switcher from "@/components/language/Switcher";
import UpdateUserProfile from "@/components/modal/UpdateUserProfile";
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
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationSheet } from "../../components/header/NavigationSheet";
import { NavMenu } from "../../components/header/NavMenu";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <nav className="h-16 bg-background border-b container">
        <div className="h-full flex items-center justify-between px-4">
          <Link to={"/"}>
            <h2 className="flex items-center gap-2">
              <img className="size-8" src={logo1} alt="" />{" "}
              <p className="font-bold text-xl">Pharma Care</p>
            </h2>
          </Link>

          {/* Desktop Menu */}

          <div className="flex items-center gap-6 md:gap-10">
            <NavMenu className="hidden md:block" />
            {user && (
              <>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Avatar className="rounded-full object-cover">
                      <AvatarImage
                        className="object-cover bg-cover"
                        referrerPolicy="no-referrer"
                        src={user?.photoURL}
                        alt={user?.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-4">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={"/dashboard"}>
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => setIsOpen(!isOpen)}>
                      Update Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={logOut}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            <div className="hidden md:block">
              <Switcher />
            </div>
            {!user && (
              <>
                <Link to={"/auth/signin"}>
                  <Button>Join Us</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
        <UpdateUserProfile isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </div>
  );
};

export default Navbar;
