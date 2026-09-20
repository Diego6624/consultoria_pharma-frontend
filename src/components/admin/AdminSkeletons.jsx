import { Skeleton } from "@/components/ui/skeleton";

export function AdminTableSkeleton({ columns = 4, rows = 6 }) {
  return Array.from({ length: rows }, (_, row) => (
    <tr key={row} className="border-t border-slate-200">
      {Array.from({ length: columns }, (_, column) => (
        <td key={column} className="px-4 py-4">
          <Skeleton className={`h-4 ${column === columns - 1 ? "ml-auto w-20" : "w-full max-w-[13rem]"}`} />
        </td>
      ))}
    </tr>
  ));
}

export function AdminFormSkeleton() {
  return (
    <div className="space-y-6 rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className={index === 2 ? "space-y-2 md:col-span-2" : "space-y-2"}>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}

export function ConsultationDialogSkeleton() {
  return (
    <div className="space-y-5" aria-label="Cargando detalle de la consulta" aria-busy="true">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full !bg-slate-200" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-36 !bg-slate-200" />
          <Skeleton className="h-3 w-28 !bg-slate-200" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 rounded-xl border border-slate-100 p-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-20 !bg-slate-200" />
            <Skeleton className="h-4 w-full !bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="space-y-2 rounded-xl border border-slate-200 p-4">
        <Skeleton className="h-3 w-16 !bg-slate-200" />
        <Skeleton className="h-4 w-full !bg-slate-200" />
        <Skeleton className="h-4 w-4/5 !bg-slate-200" />
        <Skeleton className="h-4 w-3/5 !bg-slate-200" />
      </div>
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-28 !bg-slate-200" />
        <Skeleton className="h-8 w-24 !bg-slate-200" />
      </div>
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div className="min-h-[calc(100vh-9rem)] space-y-6" aria-label="Cargando dashboard" aria-busy="true">
      <Skeleton className="!bg-slate-200 h-52 w-full rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="!bg-slate-200 h-32 rounded-2xl" />)}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => <Skeleton key={index} className="!bg-slate-200 h-32 rounded-2xl" />)}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <Skeleton className="!bg-slate-200 h-72 rounded-2xl" />
        <Skeleton className="!bg-slate-200 h-72 rounded-2xl" />
      </div>
      <Skeleton className="!bg-slate-200 h-64 rounded-2xl" />
    </div>
  );
}
