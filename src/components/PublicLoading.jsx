export function PublicLoading({ label = "Cargando contenido..." }) {
  return (
    <div className="flex min-h-48 items-center justify-center gap-3 px-6 py-12 text-sm text-slate-500" role="status">
      <span className="size-5 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-500" />
      {label}
    </div>
  );
}

export function PublicError({ message, onRetry }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <p className="text-sm text-red-600">{message || "No se pudo cargar el contenido."}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600">
          Reintentar
        </button>
      ) : null}
    </div>
  );
}
