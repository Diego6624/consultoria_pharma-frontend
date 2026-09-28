export default function PublicDetailSkeleton({ withSidebar = false }) {
  return (
    <div className="min-h-screen bg-white" role="status" aria-label="Cargando contenido" aria-busy="true">
      <section className="relative h-svh w-full overflow-hidden bg-slate-800">
        <div className="absolute inset-0 animate-pulse bg-slate-700" />
        <div className="relative flex h-full w-full items-center px-6 pt-24 sm:px-10 md:px-16 md:pt-0 lg:px-32 xl:px-48 2xl:px-64">
          <div className="w-full max-w-4xl space-y-5">
            <div className="h-7 w-32 animate-pulse rounded-full bg-slate-500/70" />
            <div className="h-14 w-full max-w-3xl animate-pulse rounded-lg bg-slate-500/70 sm:h-16 md:h-24" />
            <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-slate-500/60" />
            <div className="h-5 w-4/5 max-w-xl animate-pulse rounded bg-slate-500/60" />
          </div>
        </div>
      </section>

      <section className="px-8 py-12 md:px-16 lg:px-32 2xl:px-44">
        <div className={`grid gap-12 ${withSidebar ? "lg:grid-cols-3" : "grid-cols-1"}`}>
          <div className={withSidebar ? "lg:col-span-2" : ""}>
            <div className="mb-8 space-y-4">
              <div className="h-8 w-72 animate-pulse rounded bg-slate-200" />
              <div className="h-1 w-20 animate-pulse rounded-full bg-cyan-200" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-3/5 animate-pulse rounded bg-slate-200" />
            </div>
          </div>

          {withSidebar ? (
            <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 p-8" />
          ) : null}
        </div>
      </section>
    </div>
  );
}
