import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

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
import { NavLink } from "react-router-dom";
import { Separator } from "../ui/separator";
import { NavUser } from "./NavUser";

const items = [
  {
    title: "Statics",
    url: "/dashboard",
    icon: Home,
    role: "admin",
  },
  {
    title: "Manage Users",
    url: "/dashboard/manage/users",
    icon: Inbox,
    role: "admin",
  },
  {
    title: "Manage Category",
    url: "/dashboard/manage/category",
    icon: Calendar,
    role: "admin",
  },
  {
    title: "Payment Management",
    url: "/dashboard/manage/payments",
    icon: Search,
    role: "admin",
  },
  {
    title: "Sales Report",
    url: "/dashboard/sales/report",
    icon: Settings,
    role: "admin",
  },
  {
    title: "Manage Banner",
    url: "/dashboard",
    icon: Settings,
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
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
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
