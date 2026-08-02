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
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
        <h2 className="mb-2 text-2xl font-semibold">Panel privado</h2>
        <p className="text-sm text-slate-600">Aquí puedes administrar artículos y servicios conectados al backend Spring Boot.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Artículos</p>
          <p className="mt-4 text-5xl font-semibold text-slate-900">{loading ? "..." : summary.articles}</p>
          <p className="mt-2 text-sm text-slate-600">Total de noticias disponibles</p>
          <Link to="/admin/noticias" className="mt-6 inline-block">
            <Button>Administrar artículos</Button>
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Servicios</p>
          <p className="mt-4 text-5xl font-semibold text-slate-900">{loading ? "..." : summary.services}</p>
          <p className="mt-2 text-sm text-slate-600">Total de servicios disponibles</p>
          <Link to="/admin/servicios" className="mt-6 inline-block">
            <Button>Administrar servicios</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
