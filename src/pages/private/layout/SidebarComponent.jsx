import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import useAuth from "@/hooks/useAuth";
import { BriefcaseBusiness, LayoutDashboard, LogOut, MapPinned, MessageSquareText, Newspaper, Tags, Users } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();

  const normalizeRole = (role) => {
    if (!role) return "";
    return role.startsWith("ROLE_") ? role.substring(5) : role;
  };

  const userRole = normalizeRole(user?.rol);

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Artículos", path: "/admin/noticias", icon: Newspaper },
    { label: "Servicios", path: "/admin/servicios", icon: BriefcaseBusiness },
    { label: "Categorías", path: "/admin/categorias", icon: Tags },
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

  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#52C7E5]/20 shadow-sm"
      style={{ "--sidebar": "#1F4C7F", "--sidebar-foreground": "#ffffff" }}
    >
      {/* Header */}
      <SidebarHeader className="bg-[#1F4C7F]">
        <div className="px-3 group-data-[collapsible=icon]:px-0 py-3 group-data-[collapsible=icon]:py-1">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            {/* Brand mark — siempre visible */}
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0DB3DE] text-white text-sm font-bold group-data-[collapsible=icon]:hidden">
              YL
            </span>
            <span className="group-data-[collapsible=icon]:hidden text-white">
              YLPHARMA
            </span>
            <SidebarTrigger className="border-none ml-auto hidden md:flex group-data-[collapsible=icon]:mx-auto text-white hover:text-white/70 hover:bg-[#52C7E5]/20 cursor-pointer" />
          </div>
          <div className="text-xs text-slate-300 mt-2 group-data-[collapsible=icon]:hidden">
            Panel administrativo
          </div>
          <div className="text-xs font-medium text-cyan-200 mt-0.5 group-data-[collapsible=icon]:hidden">
            {user?.nombre ?? "Administrador"}
          </div>
        </div>
      </SidebarHeader>

      <hr className="border-[#52C7E5]/22" />

      {/* Nav items */}
      <SidebarContent className="bg-[#1F4C7F] px-2 py-4">
        <TooltipProvider delayDuration={300}>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className={classNames(
                      "w-full rounded-[10px] transition-colors duration-150",
                      isActive
                        ? "bg-[#0DB3DE] text-white shadow-[0_8px_18px_rgb(13_179_222/24%)] hover:bg-[#0DB3DE]"
                        : "text-[#cfe8f1] hover:bg-[#52C7E5]/16 hover:text-white"
                    )}
                  >
                    <NavLink to={item.path} onClick={handleNavigation} className="flex items-center gap-2 w-full">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </TooltipProvider>
      </SidebarContent>

      {/* Footer — botón salir */}
      <SidebarFooter className="bg-[#1F4C7F] px-2 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#0DB3DE]/80 px-3 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0DB3DE] cursor-pointer group-data-[collapsible=icon]:px-0"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden">Cerrar sesión</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
