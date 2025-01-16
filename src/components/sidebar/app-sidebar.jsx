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
} from "@/components/ui/sidebar";
import { GiMedicines } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { Separator } from "../ui/separator";
import { NavUser } from "./NavUser";

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
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <h2 className="font-bold my-4">Pharma Care</h2>
          <SidebarGroupContent>
            <SidebarMenu id="sidebarmenus">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div>
                <Separator />
              </div>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
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
