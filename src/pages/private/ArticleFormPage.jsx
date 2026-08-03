import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TipTapEditor from "@/components/TipTapEditor";
import {
  crearNoticiaConImagen,
  obtenerNoticiaAdmin,
  actualizarNoticiaConImagen,
} from "@/services/noticiasService2";
import { listarCategoriasAdmin } from "@/services/categoriasService";

const initialForm = {
  titulo: "",
  descripcion: "",
  contenido: "",
  imagen: "",
  fechaPublicacion: new Date().toISOString().slice(0, 16),
  idCategoria: "",
};

export default function ArticleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const [cats, article] = await Promise.all([
          listarCategoriasAdmin(),
          id ? obtenerNoticiaAdmin(id) : Promise.resolve(null),
        ]);

        setCategories(cats || []);

        if (article) {
          setForm({
            titulo: article.titulo || "",
            descripcion: article.descripcion || "",
            contenido: article.contenido || "",
            imagen: article.imagen || "",
            fechaPublicacion: article.fechaPublicacion ? new Date(article.fechaPublicacion).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
            idCategoria: article.idCategoria?.toString() || "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, [id]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      setPreviewImageUrl(URL.createObjectURL(file));
    } else {
      setPreviewImageUrl("");
    }
  };

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

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

    const formData = new FormData();
    formData.append("titulo", form.titulo);
    formData.append("descripcion", form.descripcion);
    formData.append("contenido", DOMPurify.sanitize(form.contenido));
    formData.append("imagen", form.imagen || "");
    formData.append("fechaPublicacion", form.fechaPublicacion);
    formData.append("idCategoria", form.idCategoria.toString());

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    // reset progress
    setUploadProgress(0);

    try {
      if (id) {
        await actualizarNoticiaConImagen(id, formData, {
          onUploadProgress: (e) => {
            if (e.total) setUploadProgress(Math.round((e.loaded * 100) / e.total));
          },
        });
      } else {
        await crearNoticiaConImagen(formData, {
          onUploadProgress: (e) => {
            if (e.total) setUploadProgress(Math.round((e.loaded * 100) / e.total));
          },
        });
      }
      setUploadProgress(100);
      navigate("/admin/noticias", { replace: true });
    } catch (error) {
      setError(error.message || "Error al guardar el artículo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-slate-200/40">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{id ? "Editar artículo" : "Crear artículo"}</h2>
          <p className="text-sm text-slate-600">Utiliza el editor para contenido enriquecido.</p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Título</label>
            <Input value={form.titulo} onChange={handleChange("titulo")} required />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Descripción corta</label>
            <Input value={form.descripcion} onChange={handleChange("descripcion")} required />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Fecha de publicación</label>
            <Input type="datetime-local" value={form.fechaPublicacion} onChange={handleChange("fechaPublicacion")} required />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Categoría</label>
            <select value={form.idCategoria} onChange={handleChange("idCategoria")} className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm outline-none" required>
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Imagen (URL)</label>
          <Input value={form.imagen} onChange={handleChange("imagen")} placeholder="https://..." />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Subir imagen</label>
          <div className="flex items-center gap-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="flex flex-col">
              {previewImageUrl ? (
                <div className="flex items-start gap-2">
                  <img src={previewImageUrl} alt="Vista previa" className="mt-2 h-28 w-28 rounded-md border object-cover" />
                  <button type="button" className="text-sm text-destructive/80" onClick={() => { setImageFile(null); setPreviewImageUrl(""); setForm((c)=>({ ...c, imagen: "" })); }}>Eliminar</button>
                </div>
              ) : form.imagen ? (
                <div className="flex items-start gap-2">
                  <img src={form.imagen} alt="Imagen actual" className="mt-2 h-28 w-28 rounded-md border object-cover" />
                  <button type="button" className="text-sm text-destructive/80" onClick={() => setForm((c)=>({ ...c, imagen: "" }))}>Eliminar URL</button>
                </div>
              ) : (
                <div className="text-xs text-slate-500">No hay imagen seleccionada.</div>
              )}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2 w-48 bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div className="h-2 bg-primary" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-500">Selecciona un archivo para reemplazar la imagen o deja la URL si ya tienes una.</p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">Contenido</label>
          <TipTapEditor value={form.contenido} onChange={handleContentChange} />
        </div>

        {error && <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
          <Button variant="outline" type="button" onClick={() => navigate("/admin/noticias")}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}
