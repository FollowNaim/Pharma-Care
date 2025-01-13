import { Logo } from "@/assets/logo/logo";
import { Button } from "@/components/ui/button";
import { NavigationSheet } from "../../components/header/NavigationSheet";
import { NavMenu } from "../../components/header/NavMenu";

const Navbar = () => {
  return (
    <div className="bg-muted">
      <nav className="h-16 bg-background border-b container">
        <div className="h-full flex items-center justify-between px-4">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button>Join Us</Button>

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
