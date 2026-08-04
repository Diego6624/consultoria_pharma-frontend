import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { listarNoticiasAdmin } from "@/services/noticiasService";
import { listarServiciosAdmin } from "@/services/serviciosService";

export default function DashboardPage() {
  const [summary, setSummary] = useState({ articles: 0, services: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [articlesPage, servicesPage] = await Promise.all([
          listarNoticiasAdmin({ page: 0, size: 1 }),
          listarServiciosAdmin({ page: 0, size: 1 }),
        ]);

        setSummary({
          articles: articlesPage?.totalElements ?? 0,
          services: servicesPage?.totalElements ?? 0,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div>
          <h2 className="text-3xl font-semibold">Panel privado</h2>
          <p className="text-sm text-slate-600">Administra el contenido de artículos y servicios desde el panel de administración.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
          <h3 className="text-xl font-semibold">Resumen del panel</h3>
          <p className="mt-2 text-sm text-slate-600">En esta vista puedes ver el estado general de los artículos y servicios disponibles.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Artículos</p>
              <p className="mt-4 text-5xl font-semibold text-slate-900">{loading ? "..." : summary.articles}</p>
              <p className="mt-2 text-sm text-slate-600">Total de noticias disponibles</p>
              <Link to="/admin/noticias" className="mt-6 inline-block">
                <Button>Administrar artículos</Button>
              </Link>
            </div>

            <div className="rounded-3xl border border-border bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Servicios</p>
              <p className="mt-4 text-5xl font-semibold text-slate-900">{loading ? "..." : summary.services}</p>
              <p className="mt-2 text-sm text-slate-600">Total de servicios disponibles</p>
              <Link to="/admin/servicios" className="mt-6 inline-block">
                <Button>Administrar servicios</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
          <h3 className="text-xl font-semibold">Acceso rápido</h3>
          <p className="mt-2 text-sm text-slate-600">Usa los enlaces rápidos para navegar directamente a las secciones de noticias y servicios.</p>
          <div className="mt-6 space-y-4">
            <Link to="/admin/noticias" className="block rounded-2xl border border-border bg-slate-50 p-4 text-sm font-medium text-slate-900 hover:bg-slate-100">
              Ver y editar artículos
            </Link>
            <Link to="/admin/servicios" className="block rounded-2xl border border-border bg-slate-50 p-4 text-sm font-medium text-slate-900 hover:bg-slate-100">
              Ver y editar servicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
