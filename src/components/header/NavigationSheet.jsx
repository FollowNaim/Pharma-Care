import logo1 from "@/assets/logo/logo.png";
import { NavMenu } from "@/components/header/NavMenu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const NavigationSheet = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <h2 className="flex items-center gap-2">
          <img className="size-8" src={logo1} alt="" />{" "}
          <p className="font-bold text-xl">Pharma Care</p>
        </h2>
        <NavMenu orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  );
};
