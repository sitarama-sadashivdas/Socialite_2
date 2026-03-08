/**
 * Aura Dashboard - App Sidebar Component
 * 
 * This component renders the main navigation sidebar with collapsible functionality.
 * It displays the app logo, navigation links for Feed, Explore, Notifications, Messages,
 * and Profile, and shows the current user's profile in the footer when expanded.
 * 
 * @component
 * @requires NavLink - Custom navigation link component
 * @requires currentUser - Mock data for current user
 * @requires ui/sidebar - Shadcn UI sidebar components
 * @requires lucide-react - For icons (Home, Bell, Mail, User, Search, TrendingUp)
 */

import { Home, Bell, Mail, User, Search, TrendingUp } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { currentUser } from "@/data/mockData";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Feed", url: "/", icon: Home },
  { title: "Explore", url: "/explore", icon: TrendingUp },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Messages", url: "/messages", icon: Mail },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-6">
        {/* Logo */}
        <div className="px-4 mb-8">
          {collapsed ? (
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                <span className="text-primary-foreground font-bold text-base">S</span>
              </div>
              <span className="text-xl font-bold text-gradient-primary">Socialite</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12">
                      <NavLink
                        to={item.url}
                        end
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200 ${
                          isActive
                            ? "gradient-primary text-primary-foreground glow-primary font-semibold"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                        activeClassName=""
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20" />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser.username}</p>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
