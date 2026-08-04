import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar";
import useAuth from "@/hooks/useAuth";
import { BriefcaseBusiness, LayoutDashboard, LogOut, MapPinned, MessageSquareText, Newspaper, Users } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const normalizeRole = (role) => {
    if (!role) return "";
    return role.startsWith("ROLE_") ? role.substring(5) : role;
  };

  const userRole = normalizeRole(user?.rol);

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Artículos", path: "/admin/noticias", icon: Newspaper },
    { label: "Servicios", path: "/admin/servicios", icon: BriefcaseBusiness },
    { label: "Ubicaciones", path: "/admin/ubicaciones", icon: MapPinned },
    { label: "Consultas", path: "/admin/consultas", icon: MessageSquareText },
  ];

  if (userRole === "MASTER") {
    menuItems.unshift({ label: "Usuarios", path: "/admin/usuarios", icon: Users });
  }

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
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
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild isActive={location.pathname.startsWith(item.path)} className="w-full">
                  <NavLink to={item.path} className={({ isActive }) => classNames("w-full text-left", isActive ? "font-semibold text-slate-900" : "text-slate-600")}>
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-2 py-4">
        <Button variant="secondary" className="w-full" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Salir
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
