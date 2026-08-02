import { useMemo } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarHeader, SidebarFooter, SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = useMemo(
    () => [
      { label: "Dashboard", path: "/admin/dashboard" },
      { label: "Artículos", path: "/admin/noticias" },
      { label: "Servicios", path: "/admin/servicios" },
    ],
    []
  );

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen">
          <Sidebar className="bg-white shadow-sm" variant="floating" collapsible="icon">
            <SidebarHeader>
              <div className="space-y-2 px-2 py-4">
                <div className="text-sm font-semibold text-slate-900">Panel privado</div>
                <div className="text-xs text-slate-500">{user?.nombre ?? "Administrador"}</div>
              </div>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent className="px-2 py-4">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      className="w-full"
                    >
                      <NavLink to={item.path} className={({ isActive }) => classNames("w-full text-left", isActive ? "font-semibold text-slate-900" : "text-slate-600")}> 
                        {item.label}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="px-2 py-4">
              <Button variant="secondary" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 p-6 md:pl-[18rem]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Panel privado</h1>
                <p className="text-sm text-slate-600">Administra el contenido de artículos y servicios.</p>
              </div>
              <SidebarTrigger />
            </div>
            <div className="space-y-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
