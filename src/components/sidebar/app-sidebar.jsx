import {
  ChartNoAxesCombined,
  CreditCard,
  FileSpreadsheet,
  Home,
  LayoutGrid,
  TicketSlash,
  UserRoundCog,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useRole from "@/hooks/useRole";
import { GiMedicines } from "react-icons/gi";
import { MdManageHistory } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Separator } from "../ui/separator";
import { NavUser } from "./NavUser";
import logoSmall from "@/assets/logo/logo-small.png";

const items = [
  {
    title: "Statics",
    url: "/dashboard/admin",
    icon: ChartNoAxesCombined,
    role: "admin",
  },
  {
    title: "Seller Statics",
    url: "/dashboard/seller",
    icon: ChartNoAxesCombined,
    role: "seller",
  },
  {
    title: "Manage Medicines",
    url: "/dashboard/manage/medicines",
    icon: GiMedicines,
    role: "seller",
  },
  {
    title: "Payments History",
    url: "/dashboard/manage/history/payments",
    icon: MdManageHistory,
    role: "seller",
  },
  {
    title: "Ask For Advertisement",
    url: "/dashboard/manage/advertisements",
    icon: RiAdvertisementFill,
    role: "seller",
  },
  {
    title: "Manage Users",
    url: "/dashboard/manage/users",
    icon: UserRoundCog,
    role: "admin",
  },
  {
    title: "Manage Category",
    url: "/dashboard/manage/category",
    icon: LayoutGrid,
    role: "admin",
  },
  {
    title: "Payment Management",
    url: "/dashboard/manage/payments",
    icon: CreditCard,
    role: "admin",
  },
  {
    title: "Sales Report",
    url: "/dashboard/sales/report",
    icon: FileSpreadsheet,
    role: "admin",
  },
  {
    title: "Manage Banner",
    url: "/dashboard/manage/banners",
    icon: TicketSlash,
    role: "admin",
  },
];

export function AppSidebar() {
  const { role } = useRole();
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <h2 className="font-bold my-4">
            {state === "collapsed" ? <img src={logoSmall} /> : "Pharma Care"}
          </h2>
          <SidebarGroupContent>
            <SidebarMenu id="sidebarmenus">
              {items.map((item) => {
                return role === item.role ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <NavLink to={item.url} end>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  ""
                );
              })}
              <div>
                <Separator />
              </div>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={"Home"} asChild>
                  <NavLink to={"/"}>
                    <Home />
                    <span>{"Home"}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
