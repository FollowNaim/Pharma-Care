import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex font-lato">
      <ScrollRestoration />
      <Toaster />
      <SidebarProvider>
        <AppSidebar />
        <main className="px-4 flex-1">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
