import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getServiceIconComponent, serviceIconCatalog } from "./serviceIconCatalog";

const normalize = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function ServiceIconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = serviceIconCatalog.find((icon) => icon.name === value) || serviceIconCatalog[0];
  const SelectedIcon = getServiceIconComponent(selected.name);

  const filteredIcons = useMemo(() => {
    const term = normalize(search.trim());
    if (!term) return serviceIconCatalog;
    return serviceIconCatalog.filter((icon) => normalize(`${icon.name} ${icon.label} ${icon.category} ${icon.keywords}`).includes(term));
  }, [search]);

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((current) => !current)} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 text-left text-sm shadow-xs transition-colors hover:bg-slate-50">
        <span className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#0DB3DE]/10 text-[#1F4C7F]">
            <SelectedIcon size={17} />
          </span>
          <span className="truncate">{selected.label}</span>
        </span>
        <ChevronDown size={16} className="shrink-0 text-slate-500" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-[280px] rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          <div className="relative mb-2">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre o categoría" className="h-9 pl-9" />
          </div>
          <div className="grid max-h-64 gap-1 overflow-y-auto">
            {filteredIcons.map((icon) => {
              const Icon = getServiceIconComponent(icon.name);
              return (
                <button key={icon.name} type="button" onClick={() => { onChange(icon.name); setOpen(false); setSearch(""); }} className={`cursor-pointer flex items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-slate-100 ${selected.name === icon.name ? "bg-sky-50 text-[#1F4C7F]" : "text-slate-700"}`}>
                  <Icon size={18} className="shrink-0" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{icon.label}</span>
                    <span className="block truncate text-xs text-slate-400">{icon.category}</span>
                  </span>
                </button>
              );
            })}
            {filteredIcons.length === 0 && <p className="px-2 py-4 text-center text-sm text-slate-500">No encontramos iconos con esa búsqueda.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
