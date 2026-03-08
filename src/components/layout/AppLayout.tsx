/**
 * Aura Dashboard - App Layout Component
 * 
 * This is the main layout component that wraps all authenticated pages.
 * It provides the sidebar context and arranges the sidebar, navbar, and main content area.
 * Uses React Router's Outlet to render child route components.
 * 
 * @component
 * @requires SidebarProvider - Provides sidebar context to child components
 * @requires AppSidebar - The collapsible sidebar navigation
 * @requires AppNavbar - The top navigation bar with search
 * @requires Outlet - React Router component for nested routes
 * 
 * @see https://reactrouter.com/en/main/components/outlet
 */

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppNavbar />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
