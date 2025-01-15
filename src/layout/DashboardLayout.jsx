import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <main className="px-4">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
