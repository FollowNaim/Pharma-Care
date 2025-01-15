import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { NavUser } from "./NavUser";
import { Separator } from "../ui/separator";

const items = [
  {
    title: "Statics",
    url: "/dashboard",
    icon: Home,
    role: "admin",
  },
  {
    title: "Manage Users",
    url: "/dashboard",
    icon: Inbox,
    role: "admin",
  },
  {
    title: "Manage Category",
    url: "/dashboard",
    icon: Calendar,
    role: "admin",
  },
  {
    title: "Payment Management",
    url: "/dashboard",
    icon: Search,
    role: "admin",
  },
  {
    title: "Sales Report",
    url: "/dashboard",
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
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
