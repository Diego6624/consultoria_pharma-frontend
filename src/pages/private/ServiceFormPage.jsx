import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TipTapEditor from "@/components/TipTapEditor";
import { crearServicio, obtenerServicioAdmin, actualizarServicio } from "@/services/serviciosService";

const initialForm = {
  titulo: "",
  descripcion: "",
  contenido: "",
  imagen: "",
};

export default function ServiceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);
        try {
        const service = await obtenerServicioAdmin(id);
        setForm({
          titulo: service.titulo || "",
          descripcion: service.descripcion || "",
          contenido: service.contenido || "",
          imagen: service.imagen || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleContentChange = (value) => {
    setForm((current) => ({ ...current, contenido: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      contenido: DOMPurify.sanitize(form.contenido),
    };

    try {
      if (id) {
        await updateAdminService(id, payload);
      } else {
        await createAdminService(payload);
      }
      navigate("/admin/servicios", { replace: true });
    } catch (error) {
      setError(error.message || "Error al guardar el servicio");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{id ? "Editar servicio" : "Crear servicio"}</h2>
          <p className="text-sm text-slate-600">Redacta el contenido en el editor y guarda los cambios.</p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Título</label>
          <Input value={form.titulo} onChange={handleChange("titulo")} required />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Descripción corta</label>
          <Input value={form.descripcion} onChange={handleChange("descripcion")} required />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Imagen (URL)</label>
          <Input value={form.imagen} onChange={handleChange("imagen")} placeholder="https://..." />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Contenido</label>
          <TipTapEditor value={form.contenido} onChange={handleContentChange} />
        </div>

        {error && <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
          <Button variant="outline" type="button" onClick={() => navigate("/admin/servicios")}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}
