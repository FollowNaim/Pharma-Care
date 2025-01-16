import { Logo } from "@/assets/logo/logo";
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
import { Link } from "react-router-dom";
import { NavigationSheet } from "../../components/header/NavigationSheet";
import { NavMenu } from "../../components/header/NavMenu";

const Navbar = () => {
  const { user, logOut } = useAuth();
  return (
    <div className="">
      <nav className="h-16 bg-background border-b container">
        <div className="h-full flex items-center justify-between px-4">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            {user && (
              <>
                <Button
                  onClick={logOut}
                  variant=""
                  className="hidden sm:inline-flex"
                >
                  Sign Out
                </Button>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Avatar className="rounded-full object-cover">
                      <AvatarImage
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
                    <DropdownMenuItem>Update Profile</DropdownMenuItem>

                    <DropdownMenuItem>Log Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            {!user && (
              <>
                <Link to={"/auth/signin"}>
                  <Button variant="outline" className="hidden sm:inline-flex">
                    Sign In
                  </Button>
                </Link>
                <Link to={"/auth/signup"}>
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
      </nav>
    </div>
  );
};

export default Navbar;
