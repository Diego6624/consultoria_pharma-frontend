import { Outlet, useLocation } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const sectionNames = {
  dashboard: "Resumen general",
  noticias: "Gestión de artículos",
  servicios: "Gestión de servicios",
  usuarios: "Gestión de usuarios",
  ubicaciones: "Ubicaciones",
  categorias: "Categorías",
  consultas: "Consultas recibidas",
};

const AdminShell = () => {
  const location = useLocation();
  const { user } = useAuth();
  const section = location.pathname.split("/")[2] || "dashboard";

  return (
    <SidebarProvider>
      <div className="admin-shell flex min-h-screen w-full">

        {/* Sidebar */}
        <SidebarComponent />

        {/* Contenido principal */}
        <div className="admin-shell__content flex min-w-0 flex-1 flex-col">

          {/* Header Mobile */}
          <header className="admin-shell__mobile-header flex items-center justify-between px-4 py-3 md:hidden">
            <SidebarTrigger className="p-2 rounded-lg hover:bg-white/20 transition text-white" />
            <div className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              <h1 className="text-base font-bold">Panel Administrativo</h1>
            </div>
            {/* Spacer para centrar el título */}
            <div className="w-9" />
          </header>

          <header className="admin-shell__topbar hidden items-center justify-between border-b px-6 py-4 md:flex lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0DB3DE]">Panel administrativo</p>
              <h1 className="mt-1 text-xl font-bold text-[#1F4C7F]">{sectionNames[section] || "Administración"}</h1>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[#1F4C7F]">{user?.nombre || "Administrador"}</p>
              <p className="text-xs text-slate-500">{user?.rol?.replace("ROLE_", "") || "ADMIN"}</p>
            </div>
          </header>

          <main className="p-4 sm:p-6 flex-1">
            <Outlet />
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminShell;
