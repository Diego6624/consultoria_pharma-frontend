import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, FolderKanban, MapPinned, Newspaper, RefreshCw } from "lucide-react";
import { toast } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { obtenerDashboardAdmin } from "@/services/dashboardService";
import { formatDate } from "@/lib/content";
import { AdminDashboardSkeleton } from "@/components/admin/AdminSkeletons";

const metrics = [
  { key: "totalConsultas", label: "Consultas recibidas", icon: CalendarDays, tone: "blue" },
  { key: "totalArticulos", label: "Artículos publicados", icon: Newspaper, tone: "blue" },
  { key: "totalServicios", label: "Servicios", icon: BriefcaseBusiness, tone: "blue" },
  { key: "totalUbicaciones", label: "Ubicaciones", icon: MapPinned, tone: "blue" },
  { key: "totalCategorias", label: "Categorías", icon: FolderKanban, tone: "blue" },
];

function LoadingBlock() {
  return <AdminDashboardSkeleton />;
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      setData(await obtenerDashboardAdmin());
    } catch (loadError) {
      setError(loadError.message || "No se pudo cargar el dashboard");
      toast.danger(loadError.message || "No se pudo cargar el dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDashboard(); }, []);

  if (loading) return <LoadingBlock />;
  if (error) return <div className="flex min-h-72 flex-col items-center justify-center gap-4 text-center"><p className="text-sm text-red-600">{error}</p><Button onClick={loadDashboard}><RefreshCw size={16} /> Reintentar</Button></div>;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[#1F4C7F] p-6 text-white shadow-lg shadow-[#1F4C7F]/15 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52C7E5]">
              Vista general
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              Panel administrativo
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Supervisa el contenido y las solicitudes recibidas desde un solo lugar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/noticias/nuevo">
              <Button className="bg-[#0DB3DE] text-white hover:text-white border-none cursor-pointer hover:bg-[#52C7E5]">
                <Newspaper size={16} />
                Crear artículo
              </Button>
            </Link>
            <Link to="/admin/servicios/nuevo">
              <Button variant="outline" className="bg-[#0DB3DE] text-white hover:text-white border-none cursor-pointer hover:bg-[#52C7E5]">
                <BriefcaseBusiness size={16} />
                Crear servicio
              </Button>
            </Link>
            <a href="/" target="_blank" rel="noreferrer">
              <Button variant="outline" className="bg-[#0DB3DE] text-white hover:text-white border-none cursor-pointer hover:bg-[#52C7E5]">
                <ArrowUpRight size={16} />
                Previsualizar sitio
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ key, label, icon: Icon, tone }) =>
          <div key={key} className="rounded-2xl border border-[#1F4C7F]/10 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {label}
                </p>
                <p className="mt-3 text-4xl font-bold text-[#1F4C7F]">
                  {data?.[key] ?? 0}
                </p>
              </div>
              <span className={`flex size-11 items-center justify-center rounded-xl ${tone === "cyan" ? "bg-[#0DB3DE]/12 text-[#0DB3DE]" : "bg-[#52C7E5]/20 text-[#1F4C7F]"}`}>
                <Icon size={21} />
              </span>
            </div>
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#1F4C7F]/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0DB3DE]">
            Última consulta recibida
          </p>
          {data?.ultimaConsulta ?
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <p className="font-bold text-[#1F4C7F]">
                  {data.ultimaConsulta.nombre}
                </p>
                <p className="text-sm text-slate-500">
                  {data.ultimaConsulta.correo}
                </p>
              </div>
              <time className="text-xs text-slate-500">{formatDate(data.ultimaConsulta.fecha)}
              </time>
            </div>
            :
            <p className="mt-3 text-sm text-slate-500">
              Aún no hay consultas.
            </p>
          }
        </div>
        <div className="rounded-2xl border border-[#1F4C7F]/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0DB3DE]">
            Último artículo publicado
          </p>
          {data?.ultimoArticulo ?
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="line-clamp-2 font-bold text-[#1F4C7F]">
                {data.ultimoArticulo.titulo}
              </p>
              <time className="shrink-0 text-xs text-slate-500">
                {formatDate(data.ultimoArticulo.fechaPublicacion)}
              </time>
            </div>
            :
            <p className="mt-3 text-sm text-slate-500">
              Aún no hay artículos.
            </p>
          }
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-2xl border border-[#1F4C7F]/10 bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#1F4C7F]">
                Actividad reciente
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Las últimas solicitudes del formulario público.
              </p>
            </div>
            <Link to="/admin/consultas" className="text-sm font-semibold text-[#0DB3DE]">
              Ver todas
            </Link>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {(data?.consultasRecientes || []).map((item) =>
              <Link to="/admin/consultas" key={item.idConsulta} className="flex items-center justify-between gap-4 py-3 first:pt-0 hover:bg-[#EBEDEE]/40">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {item.nombre}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {item.correo}
                  </p>
                </div>
                <time className="shrink-0 text-xs text-slate-500">
                  {formatDate(item.fecha)}
                </time>
              </Link>
            )}
            {!data?.consultasRecientes?.length ?
              <p className="py-8 text-center text-sm text-slate-500">
                Aún no hay consultas recibidas.
              </p>
              : null
            }
          </div>
        </div>
        <div className="rounded-2xl border border-[#1F4C7F]/10 bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#52C7E5]/25 text-[#1F4C7F]">
              <CalendarDays size={19} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Esta semana
              </p>
              <p className="text-3xl font-bold text-[#1F4C7F]">
                {data?.consultasEstaSemana ?? 0}
              </p>
            </div>
          </div>
          {data?.consultasSinRevisarHoy > 0 ?
            <div className="mt-6 rounded-xl border border-[#0DB3DE]/25 bg-[#0DB3DE]/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#1F4C7F]">
                  Consultas nuevas hoy
                </p>
                <span className="rounded-full bg-[#0DB3DE] px-2.5 py-1 text-xs font-bold text-white">
                  Nuevo
                </span>
              </div>
              <p className="mt-2 text-2xl font-bold text-[#0DB3DE]">
                {data.consultasSinRevisarHoy}
              </p>
              <p className="text-xs text-slate-600">
                Sin revisar todavía
              </p>
            </div>
            :
            <div className="mt-6 rounded-xl bg-[#EBEDEE] p-4 text-sm text-slate-600">
              No hay consultas nuevas sin revisar hoy.
            </div>
          }
          <Link to="/admin/consultas" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0DB3DE]">
            Revisar consultas
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-[#1F4C7F]/10 bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1F4C7F]">
              Últimos artículos
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Contenido publicado recientemente.
            </p>
          </div>
          <Link to="/admin/noticias" className="text-sm font-semibold text-[#0DB3DE]">
            Ver artículos
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {(data?.articulosRecientes || []).map((article) =>
            <Link key={article.idNoticia} to={`/admin/noticias/${article.idNoticia}/editar`} className="rounded-xl border border-[#1F4C7F]/10 bg-[#EBEDEE]/45 p-4 transition hover:border-[#52C7E5] hover:bg-white">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#52C7E5]/25 px-2.5 py-1 text-xs font-semibold text-[#1F4C7F]">
                  {article.nombreCategoria || "Sin categoría"}
                </span>
                <ArrowUpRight size={16} className="text-[#0DB3DE]" />
              </div>
              <h4 className="mt-4 line-clamp-2 text-sm font-bold text-slate-800">
                {article.titulo}
              </h4>
              <p className="mt-3 text-xs text-slate-500">
                {formatDate(article.fechaPublicacion)}
              </p>
            </Link>
          )}
          {!data?.articulosRecientes?.length ?
            <p className="col-span-full py-8 text-center text-sm text-slate-500">
              Aún no hay artículos publicados.
            </p>
            : null
          }
        </div>
      </section>
    </div>
  );
}
